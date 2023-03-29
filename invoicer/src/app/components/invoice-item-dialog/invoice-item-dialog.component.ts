import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceItem } from 'src/app/models/invoice-item';

@Component({
  selector: 'app-invoice-item-dialog',
  templateUrl: './invoice-item-dialog.component.html',
  styleUrls: ['./invoice-item-dialog.component.css'],
})
export class InvoiceItemDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<InvoiceItemDialogComponent>) {}
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
