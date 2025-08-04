import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../shared/booking.model';
import { MaterialModule } from '../../material/material-module';
import { FirebaseDataService } from '../../shared/firebase-data.service';

@Component({
  selector: 'app-appointments-view',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './appointments-view.component.html',
  styleUrls: ['./appointments-view.component.scss']
})
export class AppointmentsViewComponent implements OnChanges {
  @Input() bookings: Booking[] = [];
  @Input() selectedDate: string = '';
  @Output() dateChanged = new EventEmitter<string>();

  selectedAppointment: Booking | null = null;
  internalSelectedDate: Date | null = null;

  private firebaseService = inject(FirebaseDataService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && changes['selectedDate'].currentValue) {
      this.internalSelectedDate = new Date(this.selectedDate);
    }
  }

  selectAppointment(booking: Booking): void {
    this.selectedAppointment = booking;
  }

  onDateChange(event: any): void {
    const rawDate = event?.value instanceof Date ? event.value : new Date(event?.value);
    if (!isNaN(rawDate.getTime())) {
      const isoDate = rawDate.toISOString().split('T')[0];
      this.internalSelectedDate = rawDate;
      this.selectedDate = isoDate;
      this.dateChanged.emit(isoDate);
    }
  }

  closeAppointmentDetails(): void {
    this.selectedAppointment = null;
  }

  cancelAppointment(): void {
    if (!this.selectedAppointment) return;

    this.firebaseService
      .deleteBooking(this.selectedAppointment)
      .then(() => {
        this.bookings = this.bookings.filter(
          (b) =>
            !(
              b.clientName === this.selectedAppointment!.clientName &&
              b.appointmentDate === this.selectedAppointment!.appointmentDate &&
              b.appointmentTime === this.selectedAppointment!.appointmentTime &&
              b.stylistEmail === this.selectedAppointment!.stylistEmail
            )
        );
        this.selectedAppointment = null;
      })
      .catch((error) => {
        console.error('Error cancelling appointment:', error);
      });
  }
}