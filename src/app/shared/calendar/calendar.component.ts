import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    standalone: false
})
export class CalendarComponent implements OnInit { // Class definition for the Calendar component 

  constructor() { }

  ngOnInit(): void { // Lifecycle hook that runs after the component is initialized
  }

}
