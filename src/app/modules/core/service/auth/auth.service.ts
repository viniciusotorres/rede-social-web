import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { loginInterface } from '../../models/login.interface';
import { environments } from '../../../../../environments/environments.prod';
import { registerInterface } from '../../models/register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url_api = environments.api;
  private base = 'auth';

  constructor(private http: HttpClient) { }

  login(data: loginInterface): Observable<any> {
    try {
      return this.http.post(`${this.url_api}/${this.base}/login`, data)
        .pipe(
          catchError(this.handleError)
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  register(data: registerInterface): Observable<any> {
    try {
      return this.http.post(`${this.url_api}/${this.base}/register`, data)
        .pipe(
          catchError(this.handleError)
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  validarToken(email: string, code: string): Observable<any> {
    return this.http.post(`${this.url_api}/${this.base}/verify`, { email, code }, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  getUserIdFromToken(): string | null {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('No token found in sessionStorage');
        return null;
      }
      const decoded: any = jwt_decode(token);
      return decoded.id || null;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      errorMessage = `A backend error occurred: ${error.status}, ` +
        `body was: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}

function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}
