import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-stylist-dashboard',
  templateUrl: './stylist-dashboard.component.html',
  styleUrls: ['./stylist-dashboard.component.css'],
})
export class StylistDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  stylists: string[] = ['Ashley', 'Jordan', 'Casey'];
  selectedStylist: string = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
      }
    });
  }

  onStylistSelect(): void {
    this.filteredAppointments = this.appointments.filter(
      (appt) => appt.stylist === this.selectedStylist
    );
  }
}