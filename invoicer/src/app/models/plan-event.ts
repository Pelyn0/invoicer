export interface PlanEvent {
  id?: string;
  title: string;
  description: string;
  category?: string;
  responsible?: string;
  location?: string;
  from: Date;
  to?: Date;

  
  selectedEvent?: string;
}
