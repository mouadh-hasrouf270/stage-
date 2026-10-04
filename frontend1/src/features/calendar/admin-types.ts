export type CalendarEventType = "rdv_client" | "audience" | "echeance";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  lawyerId: string;
  lawyerName: string;
  type: CalendarEventType;
}

export interface InternalLawyerOption {
  id: string;
  name: string;
}
