import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { BlobServiceClient } from '@azure/storage-blob';
import { InvoiceItem } from 'src/app/models/invoice-item';
import { environment } from 'src/environment';
import { InvoiceItemDialogComponent } from '../invoice-item-dialog/invoice-item-dialog.component';
import { SavedInvoicesDialogComponent } from '../saved-invoices/saved-invoices.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  blobServiceClient = new BlobServiceClient(environment.blobContainerSasUrl);
  fileName: string = '';
  invoiceData: InvoiceItem[] = [
    {
      title: 'Продукт 1',
      manufacturer: 'Виробник 1',
      quantity: 2,
      price: 10,
    },
    {
      title: 'Продукт 2',
      manufacturer: 'Виробник 2',
      quantity: 1,
      price: 20,
    },
    {
      title: 'Продукт 3',
      manufacturer: 'Виробник 3',
      quantity: 3,
      price: 5,
    },
  ];

  columns = [
    {
      columnDef: 'number',
      header: '№',
      cell: (_: InvoiceItem, i: number) => `${i}`,
    },
    {
      columnDef: 'title',
      header: 'Модель',
      cell: (element: InvoiceItem) => `${element.title}`,
    },
    {
      columnDef: 'manufacturer',
      header: 'Виробник',
      cell: (element: InvoiceItem) => `${element.manufacturer}`,
    },
    {
      columnDef: 'quantity',
      header: 'Кількість, шт',
      cell: (element: InvoiceItem) => `${element.quantity}`,
    },
    {
      columnDef: 'price',
      header: 'Ціна, грн',
      cell: (element: InvoiceItem) => `${element.price}`,
    },
    {
      columnDef: 'sum',
      header: 'Сума, грн',
      cell: (element: InvoiceItem) => `${element.price * element.quantity}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef).concat('action');

  @ViewChild(MatTable) table!: MatTable<InvoiceItem>;

  constructor(public dialog: MatDialog) {}

  edit(i: number) {
    let invoiceItem: InvoiceItem = { ...this.invoiceData[i] };
    const dialogRef = this.dialog.open(InvoiceItemDialogComponent, {
      width: '75vw',
      enterAnimationDuration: '25ms',
      exitAnimationDuration: '25ms',
      data: invoiceItem,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoiceData[i] = result;
        this.table.renderRows();
      }
    });
  }

  add() {
    const dialogRef = this.dialog.open(InvoiceItemDialogComponent, {
      width: '75vw',
      enterAnimationDuration: '25ms',
      exitAnimationDuration: '25ms',
      data: {
        title: '',
        manufacturer: '',
        price: 1,
        quantity: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoiceData.push(result);
        this.table.renderRows();
      }
    });
  }

  delete(i: number) {
    this.invoiceData.splice(i, 1);
    this.table.renderRows();
  }

  open() {
    const dialogRef = this.dialog.open(SavedInvoicesDialogComponent, {
      width: '75vw',
      enterAnimationDuration: '25ms',
      exitAnimationDuration: '25ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoiceData = JSON.parse(result.invoice) as InvoiceItem[];
        this.fileName = result.fileName;
      }
    });
  }

  async generateInvoice() {
    const pdfMake = require('pdfmake/build/pdfmake');
    const pdfFonts = require('pdfmake/build/vfs_fonts');
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

    pdfMake
      .createPdf(this.getDocDefinition())
      .download(`${this.fileName ? this.fileName : 'Receipt'}.pdf`);

    const containerClient =
      this.blobServiceClient.getContainerClient('invoicer');
    const content = JSON.stringify(this.invoiceData);
    const blobName = `${this.fileName ? this.fileName : 'Receipt'}.pdf`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(content, content.length);
  }

  getDocDefinition(): any {
    let result = { content: [] as any[] };

    result.content.push({ table: { body: this.getTableBodyForPdf() } } as any);

    return result;
  }

  getTableBodyForPdf(): any[][] {
    let result: any[][] = [];

    let headers = this.columns.map(
      (c) => ({ text: c.header, style: 'tableHeader' } as any)
    );
    result.push(headers);

    this.invoiceData.forEach((row, i) =>
      result.push([
        `${i + 1}`,
        row.title,
        row.manufacturer,
        `${row.quantity}`,
        `${row.price}`,
        `${row.price * row.quantity}`,
      ])
    );

    return result;
  }
}
