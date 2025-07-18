import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components

@Component({ // Decorator to define the component metadata
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit { // Class definition for the Calendar component 

  constructor() { }

  ngOnInit(): void { // Lifecycle hook that runs after the component is initialized
  }

}
