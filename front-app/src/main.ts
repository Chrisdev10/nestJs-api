import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app/root/app.routes';
import { AppComponent } from '@Root';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpInterceptor } from '@Shared/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateModule,
  TranslateLoader,
  TranslateCompiler,
} from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([HttpInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler,
        },
      })
    ),
  ],
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
