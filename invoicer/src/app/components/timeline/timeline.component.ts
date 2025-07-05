import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})

export class TimelineComponent implements OnInit {
    @Input() timelineData: any[] = [
        {
            title: 'Title 0',
            description: 'This is the description of the event 0',
            date: new Date('2025-06-05T19:24:00'),
            location: "Rest"
        },
        {
            title: 'Title 2',
            description: 'This is the description of the event 2',
            date: new Date('2025-06-05T19:24:00'),
            location: "Rest"
        },
        {
            title: 'Title 1',
            description: 'This is the description of the event 1',
            date: new Date('2025-06-06T19:24:00'),
            location: "Rest"
        },
        {
            title: 'Title 3',
            description: 'This is the description of the event 3',
            date: new Date('2025-06-06T19:24:00'),
            location: "Home"
        },
        {
            title: 'Title 4',
            description: 'This is the description of the event 4',
            date: new Date('2025-07-05T19:24:00'),
            location: "Home"
        }
    ];

    timelineCategories: string[] = this.timelineData.reduce(t=>t.location);
    
    ngOnInit(): void {
    }

    showDateLabel(index: number): boolean {
        if (index === 0) return true;
        const prev = this.timelineData[index - 1].date.toDateString();
        const current = this.timelineData[index].date.toDateString();
        return prev !== current;
    }
}