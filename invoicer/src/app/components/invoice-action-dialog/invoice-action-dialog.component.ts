import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rights } from 'src/app/models/rights';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-invoice-action-dialog',
  templateUrl: './invoice-action-dialog.component.html',
  styleUrls: ['./invoice-action-dialog.component.css'],
})
export class InvoiceActionDialogComponent implements OnInit {
  tool = 'invoicer';

  constructor(
    public dialogRef: MatDialogRef<InvoiceActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
  }
  async ngOnInit(): Promise<void> {
    let rights = await Auth();
    if (rights == Rights.demoPlanner){
      this.tool = 'planner';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}