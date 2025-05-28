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
    hmacSha512Base64("test").then(e=>console.log(e));
  }
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

async function hmacSha512Base64(message: string): Promise<string> {
  const enc = new TextEncoder();
  const keyData = enc.encode('invoicer');
  const messageData = enc.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);

  // Convert ArrayBuffer to Base64
  const bytes = new Uint8Array(signature);
  const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binary);
}
