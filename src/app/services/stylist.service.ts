import { Injectable } from '@angular/core'; // Import necessary Angular core services

@Injectable({ // Decorator to define the service metadata
  providedIn: 'root' // This service is provided at the root level, making it a singleton
})
export class StylistService { // Class definition for the StylistService

  constructor() { }
}
