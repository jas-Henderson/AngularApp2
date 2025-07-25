import { Component, OnInit } from '@angular/core'; // Core Angular tools
import { AppointmentService } from '../../services/appointment.service'; // Local service managing appointment data
import { FirebaseDataService } from '../../services/firebase-data.service'; // New Firebase data service
import { Appointment } from '../../models/appointment'; // Shared model interface

@Component({
  selector: 'app-stylist-dashboard',
  templateUrl: './stylist-dashboard.component.html',
  styleUrls: ['./stylist-dashboard.component.css'],
})
export class StylistDashboardComponent implements OnInit {

  // List of all appointments from the local service
  appointments: Appointment[] = [];

  // Filtered appointments based on stylist selection
  filteredAppointments: Appointment[] = [];

  // Available stylist names
  stylists: string[] = ['Ashley', 'Jordan', 'Casey'];

  // Currently selected stylist name
  selectedStylist: string = '';

  // Firebase form data model
  formData = {
    name: '',
    message: ''
  };

  // Fetched data from Firebase (strongly typed for safety)
  fetchedData: { name: string; message: string }[] = [];

  constructor(
    private appointmentService: AppointmentService,     // Injects internal service
    private firebaseService: FirebaseDataService         // Injects Firebase data service
  ) {}

  ngOnInit(): void {
    // ✅ Fetch appointments on component load
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
      }
    });

    // ✅ Load Firebase data on init as well
    this.fetchFirebaseData();
  }

  // Filters appointments by stylist name
  onStylistSelect(): void {
    this.filteredAppointments = this.appointments.filter(
      (appt) => appt.stylist === this.selectedStylist
    );
  }

  // ✅ Save form data to Firebase (with timestamp to prevent overwrite)
  saveToFirebase(): void {
    if (this.formData.name && this.formData.message) {
      const timestamp = Date.now(); // Unique ID for entry

      this.firebaseService.saveData(`/dashboardSubmissions/${timestamp}`, this.formData)
        .subscribe({
          next: () => {
            console.log('✅ Data saved to Firebase from dashboard');
            this.formData = { name: '', message: '' }; // Clear form after save
            this.fetchFirebaseData(); // Refresh data list
          },
          error: (err: any) => {
            console.error('❌ Failed to save to Firebase:', err);
          }
        });
    }
  }

  // ✅ Fetch form data from Firebase and transform for display
  fetchFirebaseData(): void {
    this.firebaseService
      .fetchData<{ [key: string]: { name: string; message: string } }>('/dashboardSubmissions')
      .subscribe({
        next: (data) => {
          this.fetchedData = data ? Object.values(data) : [];
        },
        error: (err: any) => {
          console.error('❌ Failed to fetch Firebase data:', err);
        }
      });
  }
}