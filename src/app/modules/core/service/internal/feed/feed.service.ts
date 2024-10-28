import { Injectable } from '@angular/core';
import { environments } from '../../../../../../environments/environments.prod';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
private readonly url = environments.api;
private base = 'feed';

  constructor(private http: HttpClient, private auth: AuthService) { 
  }
 
  bringFeed(): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.url}/${this.base}/${userId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
      
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  bringTopPosts(): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.url}/${this.base}/top-posts`, { headers })
      .pipe(
        catchError(this.handleError)
      );
      
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  bringTopUsers(): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.url}/user/top-profiles`, { headers })
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
      const userId = sessionStorage.getItem('userId');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.url}/${this.base}/${userId}/post`, content, { headers, responseType: 'text' })
        .pipe(
          catchError((error) => {
            console.error('Error creating post', error);
            return throwError('An unexpected error occurred');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  likePost(postId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    if (!token) {
      throw new Error('No token found in sessionStorage');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/${this.base}/${userId}/post/${postId}/like`, {}, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error liking post', error);
          return throwError('An unexpected error occurred');
        })
      );
  }

  dilikePost(postId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    if (!token) {
      throw new Error('No token found in sessionStorage');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${this.base}/${userId}/post/${postId}/like`, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error liking post', error);
          return throwError('An unexpected error occurred');
        })
      );
  }

  deletePost(postId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    if (!token) {
      throw new Error('No token found in sessionStorage');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${this.base}/${userId}/post/${postId}`, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error deleting post', error);
          return throwError('An unexpected error occurred');
        })
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('An unexpected error occurred');
  }
}
