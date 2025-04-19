import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-contacts-dialog',
  templateUrl: './invoice-contacts-dialog.component.html',
  styleUrls: ['./invoice-contacts-dialog.component.css'],
})
export class InvoiceContactsDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InvoiceContactsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
  }
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.data.contactImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
