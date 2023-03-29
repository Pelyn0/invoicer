import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { BlobServiceClient } from '@azure/storage-blob';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
      title: 'Product 1',
      manufacturer: 'Manufacturer 1',
      quantity: 2,
      price: 10,
    },
    {
      title: 'Product 2',
      manufacturer: 'Manufacturer 2',
      quantity: 1,
      price: 20,
    },
    {
      title: 'Product 3',
      manufacturer: 'Manufacturer 3',
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
      header: 'Кількість',
      cell: (element: InvoiceItem) => `${element.quantity}`,
    },
    {
      columnDef: 'price',
      header: 'Ціна',
      cell: (element: InvoiceItem) => `${element.price}`,
    },
    {
      columnDef: 'sum',
      header: 'Сума',
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
    const doc = new jsPDF();
    let result = this.getDataForPdf();
    autoTable(doc, {
      theme: 'plain',
      head: [[...result[0]]],
      body: result.slice(1),
    });

    doc.save(`${this.fileName ? this.fileName : 'Receipt'}.pdf`);

    const containerClient =
      this.blobServiceClient.getContainerClient('invoicer');
    const content = JSON.stringify(this.invoiceData);
    const blobName = `${this.fileName ? this.fileName : 'Receipt'}.pdf`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(content, content.length);
  }

  getDataForPdf(): any {
    let result = [];
    result.push(this.columns.map((c) => c.header));

    this.invoiceData.forEach((row, i) =>
      result.push([
        i + 1,
        row.title,
        row.manufacturer,
        row.quantity,
        row.price,
        row.price * row.quantity,
      ])
    );

    return result;
  }
}
