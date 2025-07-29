import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  push,
  get,
  set,
  child,
} from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  constructor(private db: Database) {}

  // Save a new booking
  saveBooking(booking: Booking) {
    const bookingsRef = ref(this.db, 'bookings/');
    return push(bookingsRef, booking);
  }

  // Get all bookings (used by admin)
  async getBookings(): Promise<Booking[]> {
    const bookingsRef = ref(this.db);
    const snapshot = await get(child(bookingsRef, 'bookings'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val()) as Booking[];
    } else {
      return [];
    }
  }

  // Get bookings for a specific stylist and date
  getBookingsForStylist(stylist: string, date: string): Observable<Booking[]> {
    const dbRef = ref(this.db);
    return from(
      get(child(dbRef, 'bookings')).then(snapshot => {
        if (!snapshot.exists()) return [];
        const allBookings = Object.values(snapshot.val()) as Booking[];
        return allBookings.filter(
          b =>
            b.stylist === stylist &&
            b.appointmentDate === date
        );
      })
    );
  }

  // Save selected services for a stylist
  saveStylistServices(stylistId: string, services: string[]): Promise<void> {
    const servicesRef = ref(this.db, `stylists/${stylistId}/services`);
    return set(servicesRef, services);
  }

  // Get saved services for a stylist
  getStylistServices(stylistId: string): Observable<string[]> {
    const servicesRef = ref(this.db, `stylists/${stylistId}/services`);
    return from(
      get(servicesRef).then(snapshot => {
        if (!snapshot.exists()) return [];
        return snapshot.val() as string[];
      })
    );
  }

  // Save availability for a specific date
  saveStylistAvailability(
    stylistId: string,
    date: string,
    times: string[]
  ): Promise<void> {
    const availabilityRef = ref(
      this.db,
      `availability/${stylistId}/${date}`
    );
    return set(availabilityRef, times);
  }

  //Get availability for a specific date
  getStylistAvailability(
    stylistId: string,
    date: string
  ): Observable<string[]> {
    const availabilityRef = ref(
      this.db,
      `availability/${stylistId}/${date}`
    );
    return from(
      get(availabilityRef).then(snapshot => {
        if (!snapshot.exists()) return [];
        return snapshot.val() as string[];
      })
    );
  }

  // Get all stylists (for admin dropdown)
  getAllStylists(): Observable<
    { id: string; name: string; email: string }[]
  > {
    const stylistsRef = ref(this.db, 'stylists');
    return from(
      get(stylistsRef).then(snapshot => {
        if (!snapshot.exists()) return [];
        const data = snapshot.val();
        return Object.entries(data).map(([id, stylist]: [string, any]) => ({
          id,
          name: stylist.name,
          email: stylist.email || '',
        }));
      })
    );
  }

  // Save stylist profile (name & email)
  saveStylistProfile(
    uid: string,
    email: string,
    name: string
  ): Promise<void> {
    const stylistRef = ref(this.db, `stylists/${uid}`);
    return set(stylistRef, {
      email,
      name,
    });
  }

  // Save stylist info (redundant, but can be reused separately if needed)
  saveStylistInfo(
    uid: string,
    data: { name: string; email: string }
  ): Promise<void> {
    const refPath = ref(this.db, `stylists/${uid}`);
    return set(refPath, data);
  }
}