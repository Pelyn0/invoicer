import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})

export class TimelineComponent implements OnInit {
    timelineData = [
        {
        title: 'Created Invoice',
        date: new Date('2024-01-01'),
        description: 'Invoice #001 was created.'
        },
        {
        title: 'Payment Received',
        date: new Date('2024-01-05'),
        description: 'Customer made a full payment.'
        },
        {
        title: 'Invoice Closed',
        date: new Date('2024-01-06'),
        description: 'Invoice marked as completed.'
        }
    ];

    ngOnInit(): void {
    }
}