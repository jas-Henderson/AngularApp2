import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService, Appointment } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
  clientName = '';
  service = '';
  time = '';

  constructor(private apptService: AppointmentService) {}

  submit() {
    if (!this.clientName || !this.service || !this.time) {
      alert('Please fill in all fields');
      return;
    }

    const newAppointment: Appointment = {
      clientName: this.clientName,
      service: this.service,
      time: this.time
    };

    this.apptService.addAppointment(newAppointment).subscribe(() => {
      alert('Appointment booked!');
      this.clientName = '';
      this.service = '';
      this.time = '';
    });
  }
}
