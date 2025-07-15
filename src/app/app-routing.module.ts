import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';
import { StylistDashboardComponent } from './pages/stylist-dashboard/stylist-dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointments', component: AppointmentFormComponent },
  { path: 'dashboard', component: StylistDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}