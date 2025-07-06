import { Component, Input, OnInit } from "@angular/core";
import { PlanEvent } from "src/app/models/plan-event";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})

export class TimelineComponent implements OnInit {
    @Input() timelineData: PlanEvent[] = [
        {
            title: 'Title 0',
            description: 'This is the description of the event 0',
            from: new Date('2025-06-05T19:24:00'),
            location: "Rest",
            responsible: ''
        },
        {
            title: 'Title 2',
            description: 'This is the description of the event 2',
            from: new Date('2025-06-05T19:24:00'),
            location: "Rest",
            responsible: '',
        },
        {
            title: 'Title 1',
            description: 'This is the description of the event 1',
            from: new Date('2025-06-06T19:24:00'),
            location: "Rest",
            responsible: '',
        },
        {
            title: 'Title 3',
            description: 'This is the description of the event 3',
            from: new Date('2025-06-06T19:24:00'),
            location: "Home",
            responsible: '',
        },
        {
            title: 'Title 4',
            description: 'This is the description of the event 4',
            from: new Date('2025-07-05T19:24:00'),
            location: "Home",
            responsible: '',
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
        const prev = data[index - 1].from.toDateString();
        const current = data[index].from.toDateString();
        return prev !== current;
    }
}