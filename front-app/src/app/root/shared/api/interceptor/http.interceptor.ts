import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, catchError, switchMap, tap } from 'rxjs';
import { environment } from '@env';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppNode } from '@Shared';
import { ApiURI, ApiResponse, ApiService, TokenService, AddTokenHeaderFn, HttpInterceptorCommonErrorHandlerFn, HttpInterceptorHandlerFn, Token } from '@Shared/api';
const baseURL: string = environment.apiURL;
const publicRoute: string[] = [baseURL, `${baseURL}token`, `${baseURL}account`, './assets/i18n/fr.json', './assets/i18n/en.json'];
export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  // Exception for translation http request
  if (!req.url.match(`${baseURL}*`)) {
    req.url.match(`${baseURL}*`);
    return next(req);
  }
  // i make sure to remove any url parameter from the string
  if (publicRoute.includes(req.url.slice(0, req.url.indexOf('?')))) {
    return next(req);
  }
  //if route is not public
  const tokenService = inject(TokenService);
  const router: Router = inject(Router);
  if (!tokenService.token$().isEmpty) {
    const api: ApiService = inject(ApiService);
    return next(setTokenInHeader(req, tokenService.token$().token)).pipe(catchError((err: HttpErrorResponse) => handleError(err, req, next, tokenService, router, api)));
  }
  return redirectToPublic(router);
};
/**
 * Request header modifier. It will insert the token into the corresponding header
 */
const setTokenInHeader: AddTokenHeaderFn = (req: HttpRequest<any>, token: string): HttpRequest<any> => {
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
};
const redirectToPublic: (router: Router) => Observable<any> = (router: Router) => {
  router.navigate([AppNode.REDIRECT_TO_PUBLIC]).then();
  return EMPTY;
};
const handleError: HttpInterceptorHandlerFn = (err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandlerFn, tokenService: TokenService, router: Router, api: ApiService): Observable<any> => {
  if (err.status === 401 || err.status === 403) {
    //but before refresh it , we must try to see if refresh token exit.. in theory yes because we can be here if token.isEmpty
    return api
      .post(`${ApiURI.REFRESH_TOKEN }?token=${tokenService.token$().refreshToken}`, {
        refresh: tokenService.token$().refreshToken,
      })
      .pipe(
        switchMap((result: ApiResponse) => {
          if (result.data) {
            //Finally if we get new token, we retry
            return next(setTokenInHeader(req, result.data.token)).pipe(
              catchError((err: HttpErrorResponse) => handleCommonError(err)),
              // if we pass here, that's mean we don't have error otherwise we go to
              tap(() => {
                tokenService.setToken({
                  ...(result.data as Token),
                  isEmpty: false,
                });
              })
            );
          }
          return redirectToPublic(router);
          // Redirect because the refresh token is expired too return redirectToPublic(router);
        })
      );
    
    // Redirect because the refresh token is not exist
    return redirectToPublic(router);
  }
  // Here we can show something to client? Maybe a toaster or ....
  return handleCommonError(err);
};
const handleCommonError: HttpInterceptorCommonErrorHandlerFn = (err: HttpErrorResponse): Observable<any> => {
  throw err;
};
