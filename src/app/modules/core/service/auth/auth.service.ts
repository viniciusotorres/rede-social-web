import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { loginInterface } from '../../models/login.interface';
import { environments } from '../../../../../environments/environments.prod';
import { registerInterface } from '../../models/register.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url_api = environments.api;
  private loginEventSubject = new Subject<void>();
  private base = 'auth';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Realiza o login do usuário.
   * @param data Dados de login do usuário.
   * @returns Observable com a resposta do servidor.
   */
  login(data: loginInterface): Observable<any> {
    return this.http.post(`${this.url_api}/${this.base}/login`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Envia novamente o código de confirmação para o e-mail.
   * @param email O e-mail do usuário.
   * @returns Observable com a resposta do servidor.
   */
  sendAgainCode(email: string): Observable<any> {
    return this.http.post(`${this.url_api}/${this.base}/send-again-code`, email, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Realiza o registro de um novo usuário.
   * @param formData Dados do formulário de registro.
   * @returns Observable com a resposta do servidor.
   */
  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.url_api}/${this.base}/register`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Valida o código de confirmação do usuário.
   * @param email E-mail do usuário.
   * @param code Código de confirmação.
   * @returns Observable com a resposta do servidor.
   */
  validarToken(email: string, code: string): Observable<any> {
    return this.http.post(`${this.url_api}/${this.base}/verify`, { email, code }, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Realiza o logout do usuário, removendo o token da sessão.
   */
  logout(): void {
    sessionStorage.removeItem('token');
  }

  /**
   * Verifica se o usuário está logado.
   * @returns true se o usuário não estiver logado; caso contrário, false.
   */
  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  /**
   * Emite um evento de login.
   */
  emitLoginEvent(): void {
    this.loginEventSubject.next();
  }

  /**
   * Retorna um Observable para o evento de login.
   * @returns Observable do evento de login.
   */
  getLoginEvent() {
    return this.loginEventSubject.asObservable();
  }

  /**
   * Obtém o ID do usuário a partir do token JWT.
   * @returns ID do usuário ou null se não encontrado.
   */
  getUserIdFromToken(): string | null {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Nenhum token encontrado no sessionStorage');
        return null;
      }
      const decoded: any = jwt_decode(token);
      return decoded.id || null;
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      return null;
    }
  }

  /**
   * Envia uma solicitação para redefinir a senha.
   * @param email O e-mail do usuário.
   * @returns Observable com a resposta do servidor.
   */
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.url_api}/${this.base}/forgot-password`, email, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Confirma a redefinição da senha do usuário.
   * @param token Código de confirmação.
   * @param password Nova senha do usuário.
   * @param email E-mail do usuário.
   * @returns Observable com a resposta do servidor.
   */
  confirmPassword(token: string, password: string, email: string): Observable<any> {
    const params = new HttpParams()
      .set('code', token)
      .set('password', password)
      .set('email', email);

    return this.http.post(`${this.url_api}/${this.base}/reset-password`, null, { params, responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Tratamento de erros da requisição HTTP.
   * @param error O erro recebido.
   * @returns Observable com a mensagem de erro apropriada.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do lado do cliente: ${error.error.message}`;
    } else {
      errorMessage = `Erro do lado do servidor: ${error.status}, corpo: ${error.error}`;
      if (error.status === 401) {
        errorMessage = 'Não autorizado. Verifique suas credenciais.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso solicitado não encontrado.';
      }
    }
    return throwError(errorMessage);
  }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

