import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/root/app.routes';
import { AppComponent } from '@Root';
import { ApplicationConfig } from '@angular/core';
import { HttpInterceptor } from '@Shared/api';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([HttpInterceptor])),
  ],
};
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
