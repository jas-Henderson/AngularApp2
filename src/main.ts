import { enableProdMode } from '@angular/core'; // Import necessary Angular core functionalities
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';  // Import the platform browser dynamic module to bootstrap the application

import { AppModule } from './app/app.module'; // Import the main application module
import { environment } from './environments/environment'; // Import the environment configuration

if (environment.production) { // Check if the application is in production mode
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule) // Bootstrap the application with the main module
  .catch(err => console.error(err));
