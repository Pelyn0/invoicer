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

    categoryMap: { [key: string]: any[] } = {};

    timelineCategories: string[] = [];

    ngOnInit(): void {
        this.timelineCategories = Array.from(
            new Set(this.timelineData.map(item => item.location))
        );

        this.categoryMap = this.timelineCategories.reduce((acc, cat) => {
            acc[cat] = this.timelineData.filter(t => t.location === cat);
            return acc;
        }, {} as { [key: string]: any[] });
    }

    showDateLabel(index: number, data: any[]): boolean {
        if (index === 0) return true;
        const prev = data[index - 1].date.toDateString();
        const current = data[index].date.toDateString();
        return prev !== current;
    }
}