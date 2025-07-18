export interface Appointment { // Interface to define the structure of an appointment object
  id?: number;
  clientName: string;
  service: string;
  stylist: string;
  time: string; // ISO date string
}