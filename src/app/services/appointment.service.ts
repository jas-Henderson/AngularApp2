import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Appointment {
    id?:number;
    clientName: string;
    service: string;
    time: string; // ISO string datetime
}

@Injectable({
    providedIn:'root'
})

export class AppointmentService {
    private apiUrl = 'http://localhost:3000/appointments';

    constructor (private http: HttpClient) {}

    getAppointments (): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
    }

    addAppointment (appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(this.apiUrl, appointment);
    }

    deleteAppointment (id:number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}