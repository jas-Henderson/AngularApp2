// src/app/booking-form/booking-form.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseDataService } from '../shared/firebase-data.service';
import { Booking } from '../shared/booking.model';
import { MaterialModule } from '../material/material-module';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatDialogModule
  ],
})
export class BookingFormComponent implements OnInit {
  selectedStylist = '';
  selectedService = '';
  appointmentDate: any;
  appointmentTime = '';
  fullName = '';
  phoneNumber = '';
  email = '';
  notes = '';
  isLoading = false;

  stylists: { id: string; name: string; email: string }[] = [];
  services = [
    { name: 'Haircut', duration: 30 },
    { name: 'Color', duration: 60 },
    { name: 'Style', duration: 45 },
    { name: 'Consultation', duration: 15 },
  ];
  appointmentDuration = 0;

  allTimes: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  availableTimes: string[] = [];

  private firebaseDataService = inject(FirebaseDataService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.firebaseDataService.getAllStylists().subscribe(data => {
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
      const dateStr = this.appointmentDate.toISOString().split('T')[0];
      this.firebaseDataService
        .getBookingsForStylist(this.selectedStylist, dateStr)
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
      console.error('Invalid stylist');
      return;
    }

    const date = this.appointmentDate.toISOString().split('T')[0];

    const booking: Booking = {
      clientName: this.fullName,
      stylist: stylist.name,
      stylistEmail: stylist.email.trim().toLowerCase(),
      service: this.selectedService,
      appointmentDate: date,
      appointmentTime: this.appointmentTime,
      duration: this.appointmentDuration,
    };

    this.isLoading = true;

    this.firebaseDataService.saveBooking(booking).then(() => {
      this.isLoading = false;
      this.dialog.open(BookingConfirmationDialog);
      this.resetForm();
    }).catch((err) => {
      this.isLoading = false;
      console.error('Error saving booking:', err);
    });
  }

  resetForm() {
    this.selectedStylist = '';
    this.selectedService = '';
    this.appointmentDate = '';
    this.appointmentTime = '';
    this.fullName = '';
    this.phoneNumber = '';
    this.email = '';
    this.notes = '';
    this.availableTimes = [];
  }
}

@Component({
  selector: 'booking-confirmation-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Appointment Confirmed</h2>
    <mat-dialog-content>
      ✅ Your appointment has been successfully booked!
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MaterialModule],
})
export class BookingConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<BookingConfirmationDialog>) {}
}