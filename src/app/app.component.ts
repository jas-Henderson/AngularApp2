import { Component } from '@angular/core'; // Import necessary Angular core components
import { HighlightDirective } from './directives/highlight.directive'; // Import custom directive for highlighting elements
@Component({ // Decorator to define the component metadata
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { // Class definition for the main application component
  title = 'AngularApp2';
}
