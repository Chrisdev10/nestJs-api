import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/root/app.routes';
import { AppComponent } from '@Root';
import { ApplicationConfig } from '@angular/core';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
};
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
