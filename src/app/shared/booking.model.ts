export interface Booking {
  id?: string; // Optional ID for Firebase
  stylist: string;
  stylistEmail: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  duration: number;
  clientName: string;
  phone?: string;
  notes?: string;
  imageUrls?: string[];
}