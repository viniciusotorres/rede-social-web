import { Injectable } from '@angular/core';
import { environments } from '../../../../../../environments/environments.prod';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
private readonly url = environments.api;
private base = 'feed';
userId: string = '30';

  constructor(private http: HttpClient, private auth: AuthService) { 
  }
 
  bringFeed(): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.url}/${this.base}/${this.userId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
      
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  createPost(content: string): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      const body = { content };
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.url}/${this.base}/${this.userId}/post`, body, { headers })
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('An unexpected error occurred');
  }
}
