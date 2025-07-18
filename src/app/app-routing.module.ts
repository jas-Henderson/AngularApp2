import { NgModule } from '@angular/core'; // Import necessary Angular core modules
import { RouterModule, Routes } from '@angular/router'; // Import Angular routing modules
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component'; // Import the appointment form component
import { StylistDashboardComponent } from './pages/stylist-dashboard/stylist-dashboard.component'; // Import the stylist dashboard component
import { HomeComponent } from './pages/home/home.component'; // Import the home component

const routes: Routes = [ // Define the application routes
  { path: '', component: HomeComponent },
  { path: 'appointments', component: AppointmentFormComponent },
  { path: 'dashboard', component: StylistDashboardComponent },
];

@NgModule({ // Decorator to define the module metadata
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {} // Export the AppRoutingModule to be used in the main application module