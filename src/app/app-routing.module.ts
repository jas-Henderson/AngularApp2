import { NgModule } from '@angular/core'; // Import Angular core module
import { RouterModule, Routes } from '@angular/router'; // Import Angular router

// Import application components to be routed
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';
import { StylistDashboardComponent } from './pages/stylist-dashboard/stylist-dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default home route
  { path: 'appointments', component: AppointmentFormComponent }, // Appointment form
  { path: 'dashboard', component: StylistDashboardComponent }, // Stylist dashboard

  // ⬇️ Redirect any unknown path to HomeComponent
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {} // Export routing module to be imported in app.module.ts