import { Routes } from '@angular/router';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StylistLoginComponent } from './stylist-login/stylist-login.component';
import { AdminAuthGuard } from './auth/admin-auth-guard';

// ✅ Lazy-loaded import for standalone component
import { StylistManagementComponent } from './admin-dashboard/manage-stylists/stylist-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'book', component: BookingFormComponent },
  { path: 'login', component: StylistLoginComponent },

  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'stylists', component: StylistManagementComponent }
    ]
  }
];