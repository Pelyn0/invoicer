import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceItem } from 'src/app/models/invoice-item';

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-invoice-item-dialog',
  templateUrl: './invoice-item-dialog.component.html',
  styleUrls: ['./invoice-item-dialog.component.css'],
})
export class InvoiceItemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InvoiceItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: InvoiceItem
  ) {
  }
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  cars: Car[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];
}
