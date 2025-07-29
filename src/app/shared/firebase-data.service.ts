import { Injectable } from '@angular/core';
import { Database, ref, push, get, child } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  constructor(private db: Database) {}

  // Save a new booking to Firebase
  saveBooking(booking: Booking) {
    const bookingsRef = ref(this.db, 'bookings/');
    return push(bookingsRef, booking);
  }

  // Get all bookings
  async getBookings(): Promise<Booking[]> {
    const bookingsRef = ref(this.db);
    const snapshot = await get(child(bookingsRef, 'bookings'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val()) as Booking[];
    } else {
      return [];
    }
  }

  // Get bookings for a specific stylist on a specific date
  getBookingsForStylist(stylist: string, date: string): Observable<Booking[]> {
    const dbRef = ref(this.db);
    return from(
      get(child(dbRef, 'bookings')).then(snapshot => {
        if (!snapshot.exists()) return [];
        const allBookings = Object.values(snapshot.val()) as Booking[];
        return allBookings.filter(b => b.stylist === stylist && b.appointmentDate === date);
      })
    );
  }
}
