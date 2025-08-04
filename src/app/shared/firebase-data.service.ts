// src/app/shared/firebase-data.service.ts

import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  push,
  get,
  set,
  onValue,
  off,
  remove,
  child,
  DataSnapshot
} from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  constructor(private db: Database) {}

  // Save booking to both /bookings and /bookingsByStylist/{emailKey}/{date}
  async saveBooking(booking: Booking): Promise<void> {
    const bookingsRef = ref(this.db, 'bookings/');
    const newBookingRef = push(bookingsRef);
    const newBookingKey = newBookingRef.key;

    const stylistKey = this.normalizeEmailKey(booking.stylistEmail);
    const date = booking.appointmentDate;
    const bookingsByStylistRef = ref(
      this.db,
      `bookingsByStylist/${stylistKey}/${date}/${newBookingKey}`
    );

    const bookingWithId = { ...booking, id: newBookingKey };

    await Promise.all([
      set(newBookingRef, bookingWithId),
      set(bookingsByStylistRef, bookingWithId)
    ]);

    console.log(`[Firebase] Booking saved for stylist ${stylistKey} on ${date}`);
  }

  // Normalize email into Firebase-safe key
  public normalizeEmailKey(email: string): string {
    return email.replace(/[.#$[\]]/g, '_');
  }

  // Get all bookings from /bookings (flat list)
  async getBookings(): Promise<Booking[]> {
    const bookingsRef = ref(this.db, 'bookings');
    const snapshot = await get(bookingsRef);
    if (snapshot.exists()) {
      console.log('[Firebase] Loaded all bookings');
      return Object.values(snapshot.val()) as Booking[];
    } else {
      console.log('[Firebase] No bookings found in /bookings');
      return [];
    }
  }

  // Get bookings for a specific stylist and date
  getBookingsForStylist(stylistEmail: string, date: string): Observable<Booking[]> {
    const stylistKey = this.normalizeEmailKey(stylistEmail);
    const bookingsRef = ref(this.db, `bookingsByStylist/${stylistKey}/${date}`);

    return new Observable<Booking[]>((observer) => {
      const callback = (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        const results: Booking[] = [];

        if (data) {
          for (let key in data) {
            results.push(data[key]);
          }
          console.log(`[Firebase] Loaded ${results.length} booking(s) for ${stylistEmail} on ${date}`);
        } else {
          console.log(`[Firebase] No bookings found for ${stylistEmail} on ${date}`);
        }

        observer.next(results);
      };

      onValue(bookingsRef, callback, { onlyOnce: false });

      // Cleanup on unsubscribe
      return () => off(bookingsRef, 'value', callback);
    });
  }

  // Cancel/delete a booking from both /bookings and /bookingsByStylist
  async deleteBooking(booking: Booking): Promise<void> {
    const { id, stylistEmail, appointmentDate } = booking;

    if (!id) {
      console.error('[Firebase] Cannot delete booking without an ID');
      return Promise.reject('Booking ID missing');
    }

    const stylistKey = this.normalizeEmailKey(stylistEmail);
    const bookingsPath = `bookings/${id}`;
    const stylistPath = `bookingsByStylist/${stylistKey}/${appointmentDate}/${id}`;

    const bookingRef = ref(this.db, bookingsPath);
    const stylistRef = ref(this.db, stylistPath);

    await Promise.all([
      remove(bookingRef),
      remove(stylistRef)
    ]);

    console.log(`[Firebase] Deleted booking ${id} from both /bookings and /bookingsByStylist`);
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
        if (!snapshot.exists()) {
          console.log(`[Firebase] No services found for stylist ${stylistId}`);
          return [];
        }
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
    const availabilityRef = ref(this.db, `availability/${stylistId}/${date}`);
    return set(availabilityRef, times);
  }

  // Get availability for a specific date
  getStylistAvailability(stylistId: string, date: string): Observable<string[]> {
    const availabilityRef = ref(this.db, `availability/${stylistId}/${date}`);
    return from(
      get(availabilityRef).then(snapshot => {
        if (!snapshot.exists()) {
          console.log(`[Firebase] No availability for stylist ${stylistId} on ${date}`);
          return [];
        }
        return snapshot.val() as string[];
      })
    );
  }

  // Get all stylists
  getAllStylists(): Observable<{ id: string; name: string; email: string }[]> {
    const stylistsRef = ref(this.db, 'stylists');
    return from(
      get(stylistsRef).then(snapshot => {
        if (!snapshot.exists()) {
          console.log('[Firebase] No stylists found');
          return [];
        }

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
  saveStylistProfile(uid: string, email: string, name: string): Promise<void> {
    const stylistRef = ref(this.db, `stylists/${uid}`);
    return set(stylistRef, { email, name });
  }

  // Load services (used in form)
  getServices(): Observable<{ name: string; duration: number }[]> {
    const servicesRef = ref(this.db, 'services');
    return from(
      get(servicesRef).then(snapshot => {
        if (!snapshot.exists()) {
          console.log('[Firebase] No services found');
          return [];
        }
        return Object.values(snapshot.val()) as { name: string; duration: number }[];
      })
    );
  }
}