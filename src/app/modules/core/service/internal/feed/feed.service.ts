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

  constructor(private http: HttpClient, private auth: AuthService) { }

  // ==========================
  // Seção de Posts
  // ==========================

  /**
   * Obtém o feed do usuário.
   * @returns Observable com os dados do feed do usuário.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
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

  /**
   * Obtém os posts mais populares.
   * @returns Observable com os dados dos posts populares.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
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

  /**
   * Cria um novo post.
   * @param content Conteúdo do post a ser criado.
   * @returns Observable com a resposta da criação do post.
   * @throws Error se o token ou userId não estiverem presentes na sessionStorage.
   */
  createPost(content: string): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('No token or userId found in sessionStorage');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const postData = { content };

      return this.http.post(`${this.url}/feed/${userId}/post`, postData, { headers, responseType: 'text' })
        .pipe(
          catchError((error) => {
            console.error('Error creating post', error);
            return throwError('An unexpected error occurred while creating the post');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  /**
   * Deleta um post.
   * @param postId ID do post a ser deletado.
   * @returns Observable com a resposta de exclusão do post.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  deletePost(postId: number): Observable<any> {
    try {
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
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  // ==========================
  // Seção de Likes
  // ==========================

  /**
   * Curte um post.
   * @param postId ID do post a ser curtido.
   * @returns Observable com a resposta de curtir o post.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  likePost(postId: number): Observable<any> {
    try {
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
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  /**
   * Lista os likes de um post.
   * @param userId ID do usuário.
   * @param postId ID do post.
   * @returns Observable com os likes do post.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  listLikes(userId: number, postId: number): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.url}/${this.base}/${userId}/post/${postId}/likes`, { headers })
        .pipe(
          catchError((error) => {
            console.error('Error listing likes', error);
            return throwError('An unexpected error occurred');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  /**
   * Desfaz o like de um post.
   * @param postId ID do post.
   * @returns Observable com a resposta de desfazer o like.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  unlike(postId: number): Observable<any> {
    try {
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
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  // ==========================
  // Seção de Dislikes
  // ==========================

  /**
   * Descurte um post.
   * @param postId ID do post.
   * @returns Observable com a resposta de descurtir o post.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  deslikePost(postId: number): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.url}/${this.base}/${userId}/post/${postId}/deslike`, {}, { headers, responseType: 'text' })
        .pipe(
          catchError((error) => {
            console.error('Error disliking post', error);
            return throwError('An unexpected error occurred');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  /**
   * Lista os deslikes de um post.
   * @param userId ID do usuário.
   * @param postId ID do post.
   * @returns Observable com os deslikes do post.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  listDeslikes(userId: number, postId: number): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.url}/${this.base}/${userId}/post/${postId}/deslikes`, { headers })
        .pipe(
          catchError((error) => {
            console.error('Error listing deslikes', error);
            return throwError('An unexpected error occurred');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  /**
   * Desfaz o deslike de um post.
   * @param postId ID do post.
   * @returns Observable com a resposta de desfazer o deslike.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  undeslikePost(postId: number): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.url}/${this.base}/${userId}/post/${postId}/deslike`, { headers, responseType: 'text' })
        .pipe(
          catchError((error) => {
            console.error('Error liking post', error);
            return throwError('An unexpected error occurred');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  // ==========================
  // Seção de Comentários
  // ==========================

  /**
   * Comenta em um post.
   * @param postId ID do post onde o comentário será feito.
   * @param content Conteúdo do comentário.
   * @returns Observable com a resposta do comentário.
   * @throws Error se o token ou userId não estiverem presentes na sessionStorage.
   */
  commentPost(postId: number, content: string): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
    
      if (!token || !userId) {
        throw new Error('No token or userId found in sessionStorage');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const commentData = { content };

      return this.http.post(`${this.url}/feed/${userId}/post/${postId}/comment`, commentData, { headers, responseType: 'text' })
        .pipe(
          catchError((error) => {
            console.error('Error commenting on post', error);
            return throwError('An unexpected error occurred while commenting');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  /**
   * Lista os comentários de um post.
   * @param userId ID do usuário.
   * @param postId ID do post.
   * @returns Observable com os comentários do post.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  listComments(userId: number, postId: number): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.url}/${this.base}/${userId}/post/${postId}/comments`, { headers })
        .pipe(
          catchError((error) => {
            console.error('Error listing comments', error);
            return throwError('An unexpected error occurred');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  /**
   * Deleta um comentário.
   * @param postId ID do post.
   * @param commentId ID do comentário a ser deletado.
   * @returns Observable com a resposta de exclusão do comentário.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
  deleteComment(postId: number, commentId: number): Observable<any> {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      if (!token) {
        throw new Error('No token found in sessionStorage');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.url}/${this.base}/${userId}/post/${postId}/comment/${commentId}`, { headers, responseType: 'text' })
        .pipe(
          catchError((error) => {
            console.error('Error deleting comment', error);
            return throwError('An unexpected error occurred');
          })
        );
    } catch (error) {
      return throwError('An unexpected error occurred');
    }
  }

  // ==========================
  // Seção de Perfis
  // ==========================

  /**
   * Obtém os perfis mais populares.
   * @returns Observable com os dados dos perfis populares.
   * @throws Error se o token não estiver presente na sessionStorage.
   */
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

  // ==========================
  // Tratamento de Erros
  // ==========================

  /**
   * Tratamento genérico de erros HTTP.
   * @param error Erro que ocorreu na requisição HTTP.
   * @returns Observable com a mensagem de erro.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('An unexpected error occurred');
  }
}