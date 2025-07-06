import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlanEvent } from 'src/app/models/plan-event';
import { Rights } from 'src/app/models/rights';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-plan-event-dialog',
  templateUrl: './plan-event-dialog.component.html',
  styleUrls: ['./plan-event-dialog.component.css'],
})
export class PlanEventDialogComponent implements OnInit {
  filteredCategories: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<PlanEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PlanEvent
  ) {
  }

  async ngOnInit(): Promise<void> {

    this.filteredCategories = [
      ...new Set(
        this.events
          .map(c => c.category)
          .filter((cat): cat is string => typeof cat === 'string')
      )
    ];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSelectedEventChanged(newValue: string) {
    let selected = this.events.find(c => c.id == newValue);

    if(selected){
      this.data.title = selected?.title;
      this.data.description = selected?.description;
      this.data.from = selected?.from;
      this.data.to = selected?.to;
      this.data.responsible = selected?.responsible;
      this.data.category = selected?.category;
      this.data.location = selected?.location;
      this.data.id = selected?.id;
    }
  }

  onSelectedCategoryChanged(value: string) {
    this.filteredCategories = [
        ...new Set(
          this.cars
            .map(c => c.category)
            .filter((cat): cat is string => typeof cat === 'string')
        )
      ].filter(option => option?.toLowerCase().includes(value.toLowerCase()) ?? true);
  }
  
  filteredItems() {
    if (!this.data.category) {
      return this.events;
    }

    return this.events.filter(event =>
      event.category?.toLowerCase().includes(this.data.category?.toLowerCase() ?? '') ?? true
    );
  }
  
  events: PlanEvent[] = [
    {
        id: '1',
        title: 'Title 0',
        description: 'This is the description of the event 0',
        from: new Date('2025-06-05T19:24:00'),
        responsible: 'admin',
        category: 'test',
        location: "Rest"
    },
    {
        title: 'Title 2',
        description: 'This is the description of the event 2',
        date: new Date('2025-06-05T19:24:00'),
        location: "Rest",
        responsible: 'admin',
        category: 'test2',
    },
    {
        title: 'Title 1',
        description: 'This is the description of the event 1',
        date: new Date('2025-06-06T19:24:00'),
        location: "Rest"
        responsible: 'admin',
        category: 'test2',
    },
    {
        title: 'Title 3',
        description: 'This is the description of the event 3',
        date: new Date('2025-06-06T19:24:00'),
        location: "Home",
        responsible: 'admin2',
        category: 'test2',
    },
    {
        title: 'Title 4',
        description: 'This is the description of the event 4',
        date: new Date('2025-07-05T19:24:00'),
        location: "Home",
        responsible: 'admin2',
        category: 'test',
    }
  ];
}