// src/app/booking-form/booking-form.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseDataService } from '../shared/firebase-data.service';
import { Booking } from '../shared/booking.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.css'],
  imports: [CommonModule, FormsModule],
})
export class BookingFormComponent implements OnInit {
  selectedStylist = ''; // stylist email selected by the user
  selectedService = '';
  appointmentDate = '';
  appointmentTime = '';
  appointmentDuration = 0;
  showConfirmation = false;

  stylists: { id: string; name: string; email: string }[] = [];
  services = [
    { name: 'Haircut', duration: 30 },
    { name: 'Color', duration: 60 },
    { name: 'Style', duration: 45 },
    { name: 'Consultation', duration: 15 },
  ];

  allTimes: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  availableTimes: string[] = [];

  private firebaseDataService = inject(FirebaseDataService);

  ngOnInit() {
    this.firebaseDataService.getAllStylists().subscribe((data) => {
      this.stylists = data;
    });
  }

  onServiceChange() {
    const service = this.services.find((s) => s.name === this.selectedService);
    this.appointmentDuration = service ? service.duration : 0;
    this.loadAvailableTimes();
  }

  onStylistOrDateChange() {
    this.loadAvailableTimes();
  }

  loadAvailableTimes() {
    if (this.selectedStylist && this.appointmentDate) {
      this.firebaseDataService
        .getBookingsForStylist(this.selectedStylist, this.appointmentDate)
        .subscribe((bookings: Booking[]) => {
          const bookedTimes = bookings.map((b) => b.appointmentTime);
          this.availableTimes = this.allTimes.filter((time) => !bookedTimes.includes(time));
        });
    } else {
      this.availableTimes = [];
    }
  }

  submitBooking() {
    const stylist = this.stylists.find(s => s.email === this.selectedStylist);
    if (!stylist) {
      console.error('Invalid stylist selection');
      return;
    }

    const booking: Booking = {
      stylist: stylist.name,
      stylistEmail: stylist.email.trim().toLowerCase(), // ensures it matches Firebase auth
      service: this.selectedService,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      duration: this.appointmentDuration,
    };

    this.firebaseDataService.saveBooking(booking).then(() => {
      this.showConfirmation = true;
      this.resetForm();
    });
  }

  resetForm() {
    this.selectedStylist = '';
    this.selectedService = '';
    this.appointmentDate = '';
    this.appointmentTime = '';
    this.appointmentDuration = 0;
    this.availableTimes = [];
  }
}