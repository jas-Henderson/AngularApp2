export interface Appointment {
  id?: number;
  clientName: string;
  service: string;
  stylist: string;
  time: string; // ISO date string
}