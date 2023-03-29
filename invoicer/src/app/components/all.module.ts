import { NgModule } from '@angular/core';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { InvoiceItemDialogComponent } from './invoice-item-dialog/invoice-item-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [InvoiceComponent, InvoiceItemDialogComponent],
  declarations: [InvoiceComponent, InvoiceItemDialogComponent],
  imports: [
    BrowserModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
})
export class AllModule {}
