import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceItem } from 'src/app/models/invoice-item';
import { environment } from 'src/environment';

@Component({
  selector: 'app-invoice-action-dialog',
  templateUrl: './invoice-action-dialog.component.html',
  styleUrls: ['./invoice-action-dialog.component.css'],
})
export class InvoiceActionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InvoiceActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    console.log(environment.demoKey);
  }
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
