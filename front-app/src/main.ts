import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/root/app.routes';
import { AppComponent } from '@Root';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ],
};
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
