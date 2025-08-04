// src/app/app.config.ts

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Required for Angular Material animations

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations() // ✅ Enables animations for Angular Material (like MatDialog, datepicker, spinner, etc.)
  ]
};