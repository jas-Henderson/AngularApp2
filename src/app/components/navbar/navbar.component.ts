import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnInit { // Class definition for the Navbar component

  constructor() { }

  ngOnInit(): void {
  }

}
