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
  stylist = ''; // stylist UID
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
    if (this.stylist && this.appointmentDate) {
      const selectedStylist = this.stylists.find((s) => s.id === this.stylist);
      if (!selectedStylist) return;

      this.firebaseDataService
        .getBookingsForStylist(selectedStylist.email, this.appointmentDate)
        .subscribe((bookings: Booking[]) => {
          const bookedTimes = bookings.map((b) => b.appointmentTime);
          this.availableTimes = this.allTimes.filter((time) => !bookedTimes.includes(time));
        });
    } else {
      this.availableTimes = [];
    }
  }

  submitBooking() {
    const selectedStylist = this.stylists.find((s) => s.id === this.stylist);
    if (!selectedStylist) return;

    const booking: Booking = {
      stylist: selectedStylist.name,
      stylistEmail: selectedStylist.email,
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
    this.stylist = '';
    this.selectedService = '';
    this.appointmentDate = '';
    this.appointmentTime = '';
    this.appointmentDuration = 0;
    this.availableTimes = [];
  }
}