import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlobServiceClient } from '@azure/storage-blob';
import { environment } from 'src/environment';

@Component({
  selector: 'app-saved-invoices',
  templateUrl: './saved-invoices.component.html',
  styleUrls: ['./saved-invoices.component.css'],
})
export class SavedInvoicesDialogComponent implements OnInit {
  blobServiceClient = new BlobServiceClient(environment.blobSasUrl);
  files: string[] = [];

  constructor(public dialogRef: MatDialogRef<SavedInvoicesDialogComponent>) {}

  async ngOnInit() {
    await this.getList();
  }

  async getList() {
    this.files = [];
    const containerClient =
      this.blobServiceClient.getContainerClient('invoicer');
    let blobs = containerClient.listBlobsFlat();

    for await (const blob of blobs) {
      this.files.push(blob.name);
    }
  }

  async onSelect(name: string) {
    const containerClient =
      this.blobServiceClient.getContainerClient('invoicer');

    const blobClient = containerClient.getBlobClient(name);
    const downloadBlockBlobResponse = await blobClient.download();
    if (downloadBlockBlobResponse.blobBody) {
      let content = await (await downloadBlockBlobResponse.blobBody).text();
      this.dialogRef.close({
        fileName: this.getFileName(name).slice(0, -4),
        invoice: content,
      });
    } else {
      this.dialogRef.close();
    }
  }

  getFileName(name: string) {
    return name.split(/\/(.*)/s)[1];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
