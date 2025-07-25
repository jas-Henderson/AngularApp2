import { Component } from '@angular/core'; // Import necessary Angular core components
import { FirebaseDataService } from './services/firebase-data.service'; // Import custom Firebase service to interact with Realtime Database
import { HighlightDirective } from './directives/highlight.directive'; // Import custom directive for highlighting elements
import { Observable } from 'rxjs'; // Import Observable for working with asynchronous data streams

@Component({ // Decorator to define the component metadata
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { // Class definition for the main application component
  title = 'AngularApp2'; // Application title

  // Form data model bound to input fields (two-way binding)
  formData = {
    name: '',
    message: ''
  };

  // Property to store fetched data from Firebase (strongly typed as array of name/message pairs)
  fetchedData: { name: string; message: string }[] = [];

  // Constructor injects the FirebaseDataService
  constructor(private firebaseService: FirebaseDataService) {}

  // Function to save form data to Firebase using Observable
  save(): void {
    const timestamp = Date.now(); // Unique path for each entry (prevents overwrites)

    // ✅ saveData returns an Observable — we use subscribe() instead of then()
    this.firebaseService.saveData(`/submissions/${timestamp}`, this.formData)
      .subscribe({
        next: () => {
          console.log('✅ Data saved to Firebase');
          this.formData = { name: '', message: '' }; // Reset form fields after saving
          this.fetch(); // Refresh data view after saving
        },
        error: (error: any) => console.error('❌ Error saving data:', error) // Handle error safely
      });
  }

  // Function to fetch data from Firebase using an Observable
  fetch(): void {
    this.firebaseService.fetchData<{ [key: string]: { name: string; message: string } }>('/submissions')
      .subscribe({
        next: (data) => {
          if (data) {
            // ✅ Convert object of objects into array for easier rendering
            this.fetchedData = Object.values(data);
            console.log('📥 Data fetched from Firebase:', this.fetchedData);
          } else {
            this.fetchedData = [];
            console.warn('📭 No data found in Firebase');
          }
        },
        error: (err: any) => {
          console.error('❌ Error fetching data:', err);
        }
      });
  }
}