import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { EMPTY, Observable, catchError, map, switchMap, tap } from 'rxjs';
import { environment } from '@env';
import { inject } from '@angular/core';
import { ApiService, TokenService } from '../services';
import { Router } from '@angular/router';
import { AppNode } from '../../routes/enum/node.enum';
import {
  AddTokenHeaderFn,
  HttpInterceptorCommonErrorHandlerFn,
  HttpInterceptorHandlerFn,
} from '../type';
import { ApiURI } from '../enum';
import { ApiResponse } from '../models/api-response';
import { Token } from '@Shared/api';
const baseURL: string = environment.apiURL;
const publicRoute: string[] = [baseURL, `${baseURL}token`, `${baseURL}account`];
export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const cleanedURL = req.url.slice(0, req.url.indexOf('?'));
  if (publicRoute.includes(cleanedURL)) {
    return next(req);
  }
  //if route is not public
  const tokenService = inject(TokenService);
  const router: Router = inject(Router);
  if (!tokenService.token$().isEmpty) {
    const api: ApiService = inject(ApiService);
    return next(setTokenInHeader(req, tokenService.token$().token)).pipe(
      catchError((err: HttpErrorResponse) =>
        handleError(err, req, next, tokenService, router, api)
      )
    );
  }
  return redirectToPublic(router);
};
const setTokenInHeader: AddTokenHeaderFn = (
  req: HttpRequest<any>,
  token: string
): HttpRequest<any> => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
};
const redirectToPublic: (router: Router) => Observable<any> = (
  router: Router
) => {
  router.navigate([AppNode.REDIRECT_TO_PUBLIC]).then();
  return EMPTY;
};
const handleError: HttpInterceptorHandlerFn = (
  err: HttpErrorResponse,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  tokenService: TokenService,
  router: Router,
  api: ApiService
): Observable<any> => {
  if (err.status === 401 || err.status === 403) {
    //but before refresh it , we must try to see if refresh token exit.. in theory yes because we can be here if token.isEmpty
    if (!tokenService.token$().isEmpty) {
      return api
        .post(ApiURI.REFRESH_TOKEN, {
          refresh: tokenService.token$().refreshToken,
        })
        .pipe(
          switchMap((result: ApiResponse) => {
            if (result.result) {
              //Finally if we get new token, we retry
              return next(setTokenInHeader(req, result.data.token)).pipe(
                catchError((err: HttpErrorResponse) => handleCommonError(err)),
                // if we pass here, that's mean we don't have error otherwise we go to
                tap(() =>
                  tokenService.setToken({
                    ...(result.data as Token),
                    isEmpty: false,
                  })
                )
              );
            }
            return redirectToPublic(router);
            // Redirect because the refresh token is expired too return redirectToPublic(router);
          })
        );
    }
    // Redirect because the refresh token is not exist
    return redirectToPublic(router);
  }
  // Here we can show something to client? Maybe a toaster or ....
  return handleCommonError(err);
};
const handleCommonError: HttpInterceptorCommonErrorHandlerFn = (
  err: HttpErrorResponse
): Observable<any> => {
  throw err;
};