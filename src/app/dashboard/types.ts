export interface IEvent {
  _id: string;
  ownerId: string;
  name: string;
  date: string;
  location: string;
  maxParticipants: number;
  descriptionHtml?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardMetrics {
  totalEvents: number;
  totalParticipants: number;
  upcomingEvents: number;
}
