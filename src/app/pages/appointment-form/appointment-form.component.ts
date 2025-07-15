import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  appointment: Appointment = {
    clientName: '',
    service: '',
    stylist: '',
    time: '',
  };

  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
  this.appointmentService.getAppointments().subscribe({
    next: (data) => {
      this.appointments = data;
    },
    error: (err) => {
      console.error('Failed to load appointments:', err);
    }
  });
}

submitAppointment(): void {
  this.appointmentService.addAppointment(this.appointment).subscribe({
    next: () => {
      this.loadAppointments();
      this.resetForm();
    },
    error: (err) => {
      console.error('Failed to submit appointment:', err);
    }
  });
}

  resetForm(): void {
    this.appointment = {
      clientName: '',
      service: '',
      stylist: '',
      time: '',
    };
  }
}