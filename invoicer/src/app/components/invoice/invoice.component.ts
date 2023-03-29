import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceItem } from 'src/app/models/invoice-item';
import { InvoiceItemDialogComponent } from '../invoice-item-dialog/invoice-item-dialog.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
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
  total = 55;
  companyName = 'ABC Company';
  columns = [
    {
      columnDef: 'number',
      header: 'No.',
      cell: (_: InvoiceItem, i: number) => `${i}`,
    },
    {
      columnDef: 'title',
      header: 'Title',
      cell: (element: InvoiceItem) => `${element.title}`,
    },
    {
      columnDef: 'manufacturer',
      header: 'Manufacturer',
      cell: (element: InvoiceItem) => `${element.manufacturer}`,
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (element: InvoiceItem) => `${element.quantity}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: InvoiceItem) => `${element.price}`,
    },
    {
      columnDef: 'sum',
      header: 'Sum',
      cell: (element: InvoiceItem) => `${element.price * element.quantity}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef).concat('action');

  constructor(public dialog: MatDialog) {}

  edit(i: number) {
    const dialogRef = this.dialog.open(InvoiceItemDialogComponent, {
      width: '75vw',
      enterAnimationDuration: '25ms',
      exitAnimationDuration: '25ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.invoiceData[i] = result;
    });
  }

  generateInvoice() {
    const doc = new jsPDF();

    autoTable(doc, { html: '#invoice-table' });

    doc.save('table.pdf');

    /* let component = this;
        const doc = new jsPDF();
        const tableHeaders = ['Number', 'Title', 'Manufacturer', 'Quantity', 'Price', 'Sum'];
        const tableData = this.invoiceData.map(row => [row.number, row.title, row.manufacturer, row.quantity, row.price, row.sum]);
        const tableOptions = {
          columnStyles: {0: {cellWidth: 15}, 1: {cellWidth: 60}, 2: {cellWidth: 45}, 3: {cellWidth: 15}, 4: {cellWidth: 20}, 5: {cellWidth: 20}},
          margin: {top: 60},
          styles: {fontSize: 10},
          addPageContent: function(data: any) {
            doc.text(component.companyName, 14, 22);
            doc.text('Invoice', 168, 22);
            doc.line(14, 25, 196, 25);
            doc.text('Contact information:', 14, 35);
            doc.text('Additional description:', 14, 45);
            autoTable(doc, {
              startY: 50,
              head: [tableHeaders],
              body: data,
              foot: [[{content: 'Total', colSpan: 4, styles: {halign: 'right'}}, {}, {}, {}, component.total]],
              showFoot: 'lastPage'});
              doc.save('invoice.pdf');
            }
        } */
  }
}
