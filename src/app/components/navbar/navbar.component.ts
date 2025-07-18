import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components

@Component({ // Decorator to define the component metadata
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit { // Class definition for the Navbar component

  constructor() { }

  ngOnInit(): void {
  }

}
