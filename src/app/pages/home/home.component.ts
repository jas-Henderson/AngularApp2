import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit { // Class definition for the Home component

  constructor() { } // Constructor for the component, currently empty

  ngOnInit(): void { // Lifecycle hook that runs after the component is initialized
    // Any initialization logic can go here
  }

}
