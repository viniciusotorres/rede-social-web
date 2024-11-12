import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environments } from '../../../../../../environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environments.api;
  private base = 'user';
  
  constructor(private http: HttpClient) { }

  getUser(userId: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {
      return this.http.get(`${this.url}/${this.base}/profile/${userId}`,{headers})
        .pipe(
          catchError(this.handleError)
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  isFollowing(followerId: string, followedId: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}/${this.base}/${followerId}/is-following/${followedId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsers(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      return this.http.get(`${this.url}/${this.base}/profiles`,{headers})
        .pipe(
          catchError(this.handleError)
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }

  }

  getUsersByName(name: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('name', name);

    return this.http.get(`${this.url}/${this.base}/profiles/search`, { headers, params })
      .pipe(
        catchError(this.handleError)
      );
  }

  followUser(followerId: string, followedId: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/${this.base}/${followerId}/follow/${followedId}`, {}, { headers, responseType: 'text' })
  }

  unfollowUser(followerId: string, followedId: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${this.base}/${followerId}/unfollow/${followedId}`, { headers, responseType: 'text' })
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('An unexpected error occurred');
  }
}
