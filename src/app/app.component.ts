// src/app/app.component.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // 
import { CommonModule } from '@angular/common'; // For ngIf, ngFor, etc.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}