import { Routes } from '@angular/router';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StylistLoginComponent } from './stylist-login/stylist-login.component';
import { AdminAuthGuard } from './auth/admin-auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'book', component: BookingFormComponent },
  { path: 'login', component: StylistLoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard]
  }
];