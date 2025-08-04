import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material-module';
import { Router, RouterModule } from '@angular/router';
import { FirebaseDataService } from '../shared/firebase-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentsViewComponent } from './appointments/appointments-view.component';
import { StylistManagementComponent } from './manage-stylists/stylist-management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    AppointmentsViewComponent,
    StylistManagementComponent,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
})
export class AdminDashboardComponent {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private dbService = inject(FirebaseDataService);

  stylistEmail = localStorage.getItem('stylistEmail') || '';
  stylistId: string = this.stylistEmail.replace(/[.@]/g, '_');
  selectedDate: string = '';
  availability: { [date: string]: string[] } = {};
  availabilityStartDate: string = '';
  availabilityEndDate: string = '';
  availabilityStartTime: string = '';
  availabilityEndTime: string = '';
  availabilitySaved = false;

  hours: string[] = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  minutes: string[] = ['00', '15', '30', '45'];
  meridianOptions: string[] = ['AM', 'PM'];

  startHour = '09';
  startMinute = '00';
  startMeridian = 'AM';

  endHour = '05';
  endMinute = '00';
  endMeridian = 'PM';

  newStylist = { name: '', email: '', password: '' };
  stylistRegistrationSuccess = false;
  stylistRegistrationError = '';
  isRegistering = false;
  stylists: any[] = [];

  services: { name: string; duration: number }[] = [];
  selectedServices: string[] = [];
  bookings: any[] = [];

  currentMonth = new Date();
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarGrid: Date[][] = [];

  selectedTab: 'availability' | 'appointments' | 'stylists' = 'availability';
  closedDates: string[] = ['2025-08-03', '2025-08-07'];
  selectedStylistId: string = '';

  appointmentDatesMap: Set<string> = new Set(); // Tracks dates that have appointments

  ngOnInit() {
    console.log('[Init] Stylist Email:', this.stylistEmail);
    this.selectedDate = this.formatDate(new Date());
    this.loadStylists();
    this.loadServices();
    this.loadAvailability();
    this.generateCalendarGrid();
    this.loadBookings(this.selectedDate);
    this.fetchMonthlyAppointments();
  }

  selectDate(date: string) {
    console.log('[selectDate] Changing to date:', date);
    this.selectedDate = date;
    this.availabilitySaved = false;
    this.loadBookings(date);
    this.fetchMonthlyAppointments();
  }

  onSelectCalendarDate(date: Date) {
    const formattedDate = this.formatDate(date);
    console.log('[onSelectCalendarDate] User clicked date:', formattedDate);
    this.selectedDate = formattedDate;
    this.selectedTab = 'appointments';
    this.loadBookings(formattedDate);
    this.fetchMonthlyAppointments();
  }

  onDateChange(date: string) {
    console.log('[onDateChange] New date selected:', date);
    this.selectDate(date);
  }

  loadStylists() {
    this.dbService.getAllStylists().subscribe((data: any[]) => {
      this.stylists = data || [];
    });
  }

  loadServices() {
    this.dbService.getServices().subscribe((data: { name: string; duration: number }[]) => {
      this.services = data || [];
    });
  }

  loadBookings(date: string) {
    console.log('[loadBookings] Requested date:', date);
    console.log('[loadBookings] Stylist Email:', this.stylistEmail);

    if (!this.stylistEmail) {
      console.warn('[loadBookings] No stylist email found. Skipping.');
      return;
    }

    this.dbService.getBookingsForStylist(this.stylistEmail, date).subscribe({
      next: (data: any[]) => {
        console.log('[loadBookings] Fetched bookings:', data);
        this.bookings = data || [];
      },
      error: (err) => {
        console.error('[loadBookings] Firebase Error:', err);
      },
    });
  }

  fetchMonthlyAppointments() {
    const stylistEmail = this.stylistEmail;
    const stylistKey = this.dbService.normalizeEmailKey(stylistEmail);
    const daysInMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    ).getDate();

    this.appointmentDatesMap.clear();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
      const formattedDate = this.formatDate(date);
      this.dbService.getBookingsForStylist(stylistEmail, formattedDate).subscribe((data: any[]) => {
        if (data && data.length > 0) {
          this.appointmentDatesMap.add(formattedDate);
        }
      });
    }
  }

  hasAppointment(date: string): boolean {
    return this.appointmentDatesMap.has(date);
  }

  hasAppointmentSafe(date: Date): boolean {
    if (!(date instanceof Date) || isNaN(date.getTime())) return false;
    const formatted = this.formatDate(date);
    return this.hasAppointment(formatted);
  }

  toggleService(serviceName: string) {
    if (this.selectedServices.includes(serviceName)) {
      this.selectedServices = this.selectedServices.filter((s) => s !== serviceName);
    } else {
      this.selectedServices.push(serviceName);
    }
  }

  addAvailabilityTime() {
    if (!this.availability[this.selectedDate]) {
      this.availability[this.selectedDate] = [];
    }
    if (!this.availability[this.selectedDate].includes(this.availabilityStartTime)) {
      this.availability[this.selectedDate].push(this.availabilityStartTime);
    }
  }

  removeAvailabilityTime(time: string) {
    if (this.availability[this.selectedDate]) {
      this.availability[this.selectedDate] = this.availability[this.selectedDate].filter((t) => t !== time);
    }
  }

  saveAvailability() {
    this.saveAvailabilityRange();
    this.availabilitySaved = true;
    this.snackBar.open('Availability updated successfully!', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onUpdateAvailability() {
    this.availabilityStartTime = `${this.startHour}:${this.startMinute} ${this.startMeridian}`;
    this.availabilityEndTime = `${this.endHour}:${this.endMinute} ${this.endMeridian}`;
    this.saveAvailability();
  }

  saveAvailabilityRange() {
    if (!this.availabilityStartDate || !this.availabilityEndDate || !this.availabilityStartTime || !this.availabilityEndTime) return;
    const start = new Date(this.availabilityStartDate);
    const end = new Date(this.availabilityEndDate);
    const current = new Date(start);

    const stylistId = this.selectedStylistId || this.stylistId;

    while (current <= end) {
      const key = this.formatDate(current);
      if (!this.availability[key]) this.availability[key] = [];
      if (!this.availability[key].includes(this.availabilityStartTime)) {
        this.availability[key].push(this.availabilityStartTime);
        this.dbService.saveStylistAvailability(stylistId, key, this.availability[key]);
      }
      current.setDate(current.getDate() + 1);
    }
  }

  loadAvailability() {
    this.dbService.getStylistAvailability(this.stylistId, this.selectedDate).subscribe((times: string[]) => {
      this.availability[this.selectedDate] = times.sort((a: string, b: string) => a.localeCompare(b));
    });
  }

  registerStylist() {
    this.isRegistering = true;
    const uid = this.newStylist.email.replace(/[.@]/g, '_');
    this.dbService
      .saveStylistProfile(uid, this.newStylist.email, this.newStylist.name)
      .then(() => {
        this.stylistRegistrationSuccess = true;
        this.stylistRegistrationError = '';
        this.newStylist = { name: '', email: '', password: '' };
        this.loadStylists();
      })
      .catch((err: any) => {
        this.stylistRegistrationSuccess = false;
        this.stylistRegistrationError = err.message || 'Error creating stylist account';
      })
      .finally(() => {
        this.isRegistering = false;
      });
  }

  getMonthYear(): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return this.currentMonth.toLocaleDateString(undefined, options);
  }

  prevMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendarGrid();
    this.fetchMonthlyAppointments();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendarGrid();
    this.fetchMonthlyAppointments();
  }

  generateCalendarGrid() {
    const start = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const end = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const grid: Date[][] = [];
    let week: Date[] = [];

    console.log('[Calendar] Generating calendar grid...');

    for (let i = 0; i < start.getDay(); i++) {
      week.push(new Date(NaN));
    }

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      week.push(new Date(d));
      if (week.length === 7) {
        grid.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(new Date(NaN));
      }
      grid.push(week);
    }

    this.calendarGrid = grid;
    console.log('[Calendar] Grid generated:', this.calendarGrid);
  }

  formatDate(date: Date): string {
    return date instanceof Date && !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
  }

  isClosed(date: Date): boolean {
    const formatted = this.formatDate(date);
    return this.closedDates?.includes(formatted);
  }

  isNotCurrentMonth(day: any): boolean {
    return !(day instanceof Date) || day.getMonth() !== this.currentMonth.getMonth();
  }

  isDateInvalid(date: Date | string): boolean {
    let d: Date;
    if (typeof date === 'string') d = new Date(date);
    else if (date instanceof Date) d = date;
    else return true;
    return !(d instanceof Date) || isNaN(d.getTime());
  }

  getDayNumber(day: any): string | number {
    if (!(day instanceof Date)) return '';
    return day.getDate();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}