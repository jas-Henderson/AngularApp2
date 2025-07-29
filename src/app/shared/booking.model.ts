export interface Booking {
  stylist: string;            // Stylist's display name
  stylistEmail: string;       // Stylist's email (used for filtering)
  service: string;            // Service selected
  appointmentDate: string;    // yyyy-mm-dd format
  appointmentTime: string;    // HH:mm format
  duration: number;           // Duration in minutes
}