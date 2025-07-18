import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components
import { AppointmentService } from '../../services/appointment.service'; // Service to handle appointment data
import { Appointment } from '../../models/appointment'; // Shared model for appointments

@Component({ // Decorator to define the component metadata
  selector: 'app-appointment-form', // Selector for the component
  templateUrl: './appointment-form.component.html', // Template for the component
  styleUrls: ['./appointment-form.component.css'], // Styles for the component
})
export class AppointmentFormComponent implements OnInit { // Class definition for the component
  appointment: Appointment = { // Initialize the appointment object with default values
    clientName: '',
    service: '',
    stylist: '',
    time: '',
  };

  appointments: Appointment[] = [];// Array to hold the list of appointments

  constructor(private appointmentService: AppointmentService) {} // Inject the AppointmentService to handle appointment operations

  ngOnInit(): void { // Lifecycle hook that runs after the component is initialized
    this.loadAppointments();
  }

  loadAppointments(): void {// Method to load appointments from the service
  this.appointmentService.getAppointments().subscribe({
    next: (data) => {
      this.appointments = data;
    },
    error: (err) => { // Handle any errors that occur while fetching appointments
      console.error('Failed to load appointments:', err);
    }
  });
}

submitAppointment(): void { // Method to submit the appointment form
  this.appointmentService.addAppointment(this.appointment).subscribe({
    next: () => {
      this.loadAppointments();
      this.resetForm();
    },
    error: (err) => { // Handle any errors that occur while submitting the appointment
      console.error('Failed to submit appointment:', err);
    }
  });
}

  resetForm(): void { // Method to reset the appointment form after submission
    this.appointment = {
      clientName: '',
      service: '',
      stylist: '',
      time: '',
    };
  }
}