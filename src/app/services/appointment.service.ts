import { Injectable } from '@angular/core'; // Import necessary Angular core services
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs'; // Import Observable for handling asynchronous data streams
import { Appointment } from '../models/appointment'; // Import the Appointment model for type safety

@Injectable({ // Decorator to define the service metadata
  providedIn: 'root'
})
export class AppointmentService { // Class definition for the AppointmentService
  private apiUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {} // Inject HttpClient to handle HTTP requests

  getAppointments(): Observable<Appointment[]> { // Method to fetch appointments from the server
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> { // Method to add a new appointment
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  deleteAppointment(id: number): Observable<void> { // Method to delete an appointment by ID
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}