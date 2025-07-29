import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseDataService } from '../shared/firebase-data.service';
import { Booking } from '../shared/booking.model';
import { SERVICES } from '../shared/constants';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [CommonModule, FormsModule],
})
export class AdminDashboardComponent implements OnInit {
  // Auth
  stylistId: string = '';
  stylistEmail: string = '';

  // Bookings
  bookings: Booking[] = [];
  fullSchedule: Booking[] = [];
  selectedDate = new Date().toISOString().split('T')[0];

  // Services
  services = SERVICES;
  selectedServices: string[] = [];

  // Availability
  availability: { [date: string]: string[] } = {};
  availabilityDate = this.selectedDate;
  newAvailabilityTime = '';

  // New stylist registration form
  newStylist = {
    name: '',
    email: '',
    password: '',
  };
  stylistRegistrationSuccess = false;
  stylistRegistrationError = '';

  private firebaseService = inject(FirebaseDataService);

  ngOnInit() {
    this.loadAuthStylist();
    this.loadFullSchedule(); // ✅ Load complete booking list for dashboard display
  }

  async loadAuthStylist() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.stylistId = user.uid;
      this.stylistEmail = user.email ?? '';
      this.loadBookings();
      this.loadServices();
      this.loadAvailabilityForDate(this.availabilityDate);
    }
  }

  // 🔹 Load stylist-specific bookings for selected date
  loadBookings() {
    if (this.stylistEmail) {
      this.firebaseService
        .getBookingsForStylist(this.stylistEmail, this.selectedDate)
        .subscribe(data => {
          this.bookings = data;
        });
    }
  }

  // 🔹 Load all bookings for admin view
  loadFullSchedule() {
    this.firebaseService.getBookings().then(data => {
      this.fullSchedule = data;
    });
  }

  // 🔹 Trigger on manual date change
  onDateChange(date: string) {
    this.selectedDate = date;
    this.availabilityDate = date;
    this.loadBookings();
    this.loadAvailabilityForDate(date);
  }

  // 🔹 Load Firebase services
  loadServices() {
    this.firebaseService.getStylistServices(this.stylistId).subscribe(data => {
      this.selectedServices = data;
    });
  }

  // 🔹 Load availability
  loadAvailabilityForDate(date: string) {
    this.firebaseService.getStylistAvailability(this.stylistId, date).subscribe(times => {
      this.availability[date] = times;
    });
  }

  // 🔹 Toggle services
  toggleService(serviceName: string) {
    if (this.selectedServices.includes(serviceName)) {
      this.selectedServices = this.selectedServices.filter(s => s !== serviceName);
    } else {
      this.selectedServices.push(serviceName);
    }
    this.saveServicesToFirebase();
  }

  saveServicesToFirebase() {
    this.firebaseService.saveStylistServices(this.stylistId, this.selectedServices);
  }

  // 🔹 Add or remove availability
  addAvailabilityTime() {
    if (!this.availability[this.availabilityDate]) {
      this.availability[this.availabilityDate] = [];
    }
    if (this.newAvailabilityTime && !this.availability[this.availabilityDate].includes(this.newAvailabilityTime)) {
      this.availability[this.availabilityDate].push(this.newAvailabilityTime);
      this.firebaseService.saveStylistAvailability(
        this.stylistId,
        this.availabilityDate,
        this.availability[this.availabilityDate]
      );
    }
    this.newAvailabilityTime = '';
  }

  removeAvailabilityTime(time: string) {
    const times = this.availability[this.availabilityDate];
    this.availability[this.availabilityDate] = times.filter(t => t !== time);
    this.firebaseService.saveStylistAvailability(
      this.stylistId,
      this.availabilityDate,
      this.availability[this.availabilityDate]
    );
  }

  hasAppointment(date: string): boolean {
    return this.bookings.some(b => b.appointmentDate === date);
  }

  // 🔹 Register new stylist
  registerStylist() {
    const auth = getAuth();
    this.stylistRegistrationSuccess = false;
    this.stylistRegistrationError = '';

    createUserWithEmailAndPassword(auth, this.newStylist.email, this.newStylist.password)
      .then(userCredential => {
        const uid = userCredential.user.uid;
        return this.firebaseService.saveStylistProfile(uid, this.newStylist.email, this.newStylist.name);
      })
      .then(() => {
        this.stylistRegistrationSuccess = true;
        this.newStylist = { name: '', email: '', password: '' };
      })
      .catch(error => {
        console.error(error);
        this.stylistRegistrationError = error.message;
      });
  }
}