import { NgModule } from '@angular/core'; // Import necessary Angular core modules
import { BrowserModule } from '@angular/platform-browser'; // Import BrowserModule for browser-specific functionalities
import { FormsModule } from '@angular/forms'; //  Import FormsModule for template-driven forms support
import { AppRoutingModule } from './app-routing.module'; // Import the routing module for application navigation
import { AppComponent } from './app.component'; // Import the main application component
import { NavbarComponent } from './components/navbar/navbar.component'; // Import the navigation bar component
import { HomeComponent } from './pages/home/home.component'; // Import the home component
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';// Import the appointment form component
import { StylistDashboardComponent } from './pages/stylist-dashboard/stylist-dashboard.component'; // Import the stylist dashboard component
import { CalendarComponent } from './shared/calendar/calendar.component'; // Import the calendar component
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for making HTTP requests
import { HighlightDirective } from './directives/highlight.directive'; // Import custom directive for highlighting elements

@NgModule({ // Decorator to define the module metadata
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AppointmentFormComponent,
    StylistDashboardComponent,
    CalendarComponent, 

  ],
  imports: [ // List of modules to import into this module
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [], // List of services to provide to the application
  bootstrap: [AppComponent] // Bootstrap the main application component
})
export class AppModule { } // Export the AppModule to be used in the main application bootstrap process
