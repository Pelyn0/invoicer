import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { BlobServiceClient } from '@azure/storage-blob';
import { InvoiceItem } from 'src/app/models/invoice-item';
import { environment } from 'src/environment';
import { InvoiceItemDialogComponent } from '../invoice-item-dialog/invoice-item-dialog.component';
import { SavedInvoicesDialogComponent } from '../saved-invoices/saved-invoices.component';
import { InvoiceActionDialogComponent } from '../invoice-action-dialog/invoice-action-dialog.component';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  //blobServiceClient = new BlobServiceClient(environment.blobContainerSasUrl);
  fileName: string = '';
  actions: string[] = ['Дія 1', 'Дія 2', 'Дія 3'];
  discount: number = 0;

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

  editAction(i: number) {
    let action: any = { action: this.actions[i] };
    const dialogRef = this.dialog.open(InvoiceActionDialogComponent, {
      width: '75vw',
      enterAnimationDuration: '25ms',
      exitAnimationDuration: '25ms',
      data: {
        discount: this.discount,
        ...action,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.actions[i] = result.action;
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
        selectedCar: '-1',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoiceData.push(result);
        this.table.renderRows();
      }
    });
  }

  addAction() {
    const dialogRef = this.dialog.open(InvoiceActionDialogComponent, {
      width: '75vw',
      enterAnimationDuration: '25ms',
      exitAnimationDuration: '25ms',
      data: {
        discount: this.discount,
        action: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.actions.push(result.action);
      }
    });
  }

  delete(i: number) {
    this.invoiceData.splice(i, 1);
    this.table.renderRows();
  }
  deleteAction(i: number) {
    this.actions.splice(i, 1);
  }
  open() {
    const dialogRef = this.dialog.open(SavedInvoicesDialogComponent, {
      width: '75vw',
      enterAnimationDuration: '25ms',
      exitAnimationDuration: '25ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let invoice = JSON.parse(result.invoice) as Invoice;

        this.invoiceData = invoice.invoiceData as InvoiceItem[];
        this.actions = invoice.actions as string[];
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

    //const containerClient =
    //  this.blobServiceClient.getContainerClient('invoicer');
    const content = JSON.stringify(this.getInvoice());
    debugger;
    const blobName = `${this.fileName ? this.fileName : 'Receipt'}.pdf`;
    //const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    //await blockBlobClient.upload(content, content.length);
  }

  getDocDefinition(): any {
    let result = { content: [] as any[], styles: {} };

    result.content.push({
      stack: [
        'Event – Агенція «ВОлЮр»',
        'Звукове, світлове та сценічне обладння',
        'Мультимедіа та спецефекти',
        'м. Яворів, вул. Маковея, 62',
        'Масюк Олег Володимирович',
        'DJMergal@gmail.com',
        'тел. 097 176 35 75',
      ],
      style: 'header',
      margin: [0, 0, 0, 25],
    });

    result.content.push({
      ul: this.actions,
      margin: [0, 0, 0, 25],
    });

    result.content.push({
      table: {
        widths: ['auto', '*', '*', 'auto', 'auto', 'auto'],
        body: this.getTableBodyForPdf(),
      },
    } as any);

    result.styles = {
      header: {
        alignment: 'right',
      },
      tableHeader: {
        bold: true,
      },
    };

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

    let sum = this.invoiceData.reduce(
      (accumulator, row) => accumulator + row.price * row.quantity,
      0
    );

    result.push([
      { colSpan: 5, text: 'Загалом:', style: 'tableHeader' },
      '',
      '',
      '',
      '',
      {
        text: `${sum}`,
        style: 'tableHeader',
      },
    ]);

    if(this.discount > 0){
      result.push([
        { colSpan: 5, text: 'Знижка:', style: 'tableHeader' },
        '',
        '',
        '',
        '',
        {
          text: `${this.discount}`,
          style: 'tableHeader',
        },
      ]);
    }
      
    result.push([
      { colSpan: 5, text: 'До сплати:', style: 'tableHeader' },
      '',
      '',
      '',
      '',
      {
        text: `${sum - this.discount}`,
        style: 'tableHeader',
      },
    ]);

    return result;
  }

  private getInvoice() {
    return {
      actions: this.actions,
      invoiceData: this.invoiceData,
    };
  }
}
