import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiResponse } from '../models/api-response';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseURL: string = environment.apiURL;
  private readonly http: HttpClient = inject(HttpClient);
  constructor() {}

  get(partURL: string): Observable<ApiResponse> {
    return this.handle(this.http.get<ApiResponse>(`${this.baseURL}${partURL}`));
  }
  post(partURL: string, payload: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseURL}${partURL}`, payload);
  }
  put(partURL: string, payload: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseURL}${partURL}`, payload);
  }
  delete(partURL: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseURL}${partURL}`);
  }
  private handle(obs: Observable<any>): Observable<ApiResponse> {
    return obs.pipe(
      map((response: Object) => this.succesHandler(response)),
      catchError((error: HttpErrorResponse) => of(this.errorHandler(error)))
    );
  }
  private errorHandler(httpError: HttpErrorResponse): ApiResponse {
    return { ...httpError.error, paramError: httpError.status === 499 };
  }
  private succesHandler(response: Object): ApiResponse {
    return { ...(response as ApiResponse), paramError: false };
  }
}
