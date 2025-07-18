import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components
import { AppointmentService } from '../../services/appointment.service'; // Service to handle appointment data
import { Appointment } from '../../models/appointment'; // Shared model for appointments

@Component({ // Decorator to define the component metadata
  selector: 'app-stylist-dashboard',
  templateUrl: './stylist-dashboard.component.html',
  styleUrls: ['./stylist-dashboard.component.css'],
})
export class StylistDashboardComponent implements OnInit { // Class definition for the Stylist Dashboard component
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  stylists: string[] = ['Ashley', 'Jordan', 'Casey'];
  selectedStylist: string = '';

  constructor(private appointmentService: AppointmentService) {} // Inject the AppointmentService to handle appointment operations

  ngOnInit(): void { // Lifecycle hook that runs after the component is initialized
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => { // Handle any errors that occur while fetching appointments
        console.error('Failed to load appointments:', err);
      }
    });
  }

  onStylistSelect(): void { // Method to filter appointments based on the selected stylist
    this.filteredAppointments = this.appointments.filter(
      (appt) => appt.stylist === this.selectedStylist
    );
  }
}