import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlobServiceClient } from '@azure/storage-blob';
import { Rights } from 'src/app/models/rights';
import { Auth } from 'src/app/services/auth';
import { environment } from 'src/environment';

@Component({
  selector: 'app-saved-invoices',
  templateUrl: './saved-invoices.component.html',
  styleUrls: ['./saved-invoices.component.css'],
})
export class SavedInvoicesDialogComponent implements OnInit {
  //blobServiceClient = new BlobServiceClient(environment.blobSasUrl);
  files: string[] = [];

  tool = 'invoicer';

  constructor(public dialogRef: MatDialogRef<SavedInvoicesDialogComponent>) {}

  async ngOnInit() {
    await this.getList();
    
    let rights = await Auth();
    if (rights == Rights.demoPlanner){
      this.tool = 'planner';
    }
  }

  async getList() {
    this.files = [];
    //const containerClient =
    //  this.blobServiceClient.getContainerClient('invoicer');
    //let blobs = containerClient.listBlobsFlat();

    //for await (const blob of blobs) {
    //  this.files.push(blob.name);
    //}
  }

  async onSelect(name: string) {
    //const containerClient =
    //  this.blobServiceClient.getContainerClient('invoicer');

    //const blobClient = containerClient.getBlobClient(name);
    //const downloadBlockBlobResponse = await blobClient.download();
    //if (downloadBlockBlobResponse.blobBody) {
    //  let content = await (await downloadBlockBlobResponse.blobBody).text();
    //  this.dialogRef.close({
    //    fileName: this.getFileName(name).slice(0, -4),
    //    invoice: content,
    //  });
    //} else {
    //  this.dialogRef.close();
    //}
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.dialogRef.close({
          fileName: this.getFileName(file.name),
          invoice: reader.result as string,
        });
      };
    }
  }

  getFileName(name: string) {
    return name.split('.').slice(0, -1).join('');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
