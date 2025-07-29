import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDataService } from '../shared/firebase-data.service';

@Component({
  selector: 'app-schedule-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-view.html',
  styleUrls: ['./schedule-view.css']
})
export class ScheduleViewComponent implements OnInit {
  bookings: any[] = [];

  constructor(private firebaseService: FirebaseDataService) {}

  ngOnInit() {
    this.firebaseService.getBookings()
      .then(data => this.bookings = data)
      .catch(err => console.error('Error loading bookings:', err));
  }
}