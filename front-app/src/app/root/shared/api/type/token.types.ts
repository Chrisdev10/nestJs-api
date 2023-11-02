import {
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService, ApiService } from '../services';

export type AddTokenHeaderFn = (
  req: HttpRequest<any>,
  token: string
) => HttpRequest<any>;
export type HttpInterceptorHandlerFn = (
  error: HttpErrorResponse,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  tokenService: TokenService,
  router: Router,
  api: ApiService
) => Observable<any>;
export type HttpInterceptorCommonErrorHandlerFn = (
  error: HttpErrorResponse
) => Observable<any>;
