import { NgModule } from '@angular/core'; // Import Angular core
import { BrowserModule } from '@angular/platform-browser'; // For browser support
import { FormsModule } from '@angular/forms'; // For template forms
import { AppRoutingModule } from './app-routing.module'; // Routing module
import { AppComponent } from './app.component'; // Root component
import { NavbarComponent } from './components/navbar/navbar.component'; // Navbar
import { HomeComponent } from './pages/home/home.component'; // Home view
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component'; // Booking form
import { StylistDashboardComponent } from './pages/stylist-dashboard/stylist-dashboard.component'; // Dashboard
import { CalendarComponent } from './shared/calendar/calendar.component'; // Calendar
import { HttpClientModule } from '@angular/common/http'; // For HTTP requests

//  Firebase modules (compatible with Angular 13)
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment'; // Your Firebase config

@NgModule({ // Define the module
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AppointmentFormComponent,
    StylistDashboardComponent,
    CalendarComponent,
  ],
  imports: [ // Import necessary modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // Firebase setup (using compat modules for Angular 13)
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [], // Services can be added here
  bootstrap: [AppComponent], // Bootstrap the root component
})
export class AppModule {} // Export the module for use in the application