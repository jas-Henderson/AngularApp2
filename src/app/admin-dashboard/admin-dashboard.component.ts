// src/app/admin-dashboard/admin-dashboard.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDataService } from '../shared/firebase-data.service';
import { Booking } from '../shared/booking.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminDashboardComponent implements OnInit {
  bookings: Booking[] = [];
  selectedDate = '';
  availableServices: string[] = [];
  availability: string[] = [];
  newService = '';
  newAvailability = '';

  private firebaseService = inject(FirebaseDataService);

  ngOnInit() {
    this.loadAllBookings();
  }

  loadAllBookings() {
    this.firebaseService.getBookings().then(data => {
      this.bookings = data;
    });
  }

  hasAppointment(date: string): boolean {
    return this.bookings.some(b => b.appointmentDate === date);
  }

  addService() {
    if (this.newService) {
      this.availableServices.push(this.newService);
      this.newService = '';
    }
  }

  addAvailability() {
    if (this.newAvailability) {
      this.availability.push(this.newAvailability);
      this.newAvailability = '';
    }
  }
}