import { Injectable } from "@angular/core";
import { environments } from "../../../../../../environments/environments.prod";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ProfileViewDTO, ResponseViewDTO, ViewProfileDTO } from "../../../models/profile.interface";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly url = environments.api;
  private readonly base = 'profile';

  constructor(private http: HttpClient) { }

  /**
   * Registra uma visualização de perfil de um usuário em outro.
   *
   * @param viewProfileDTO - DTO contendo os IDs do visualizador e do dono do perfil.
   * @returns Um Observable com a resposta da operação de visualização.
   */
  viewProfile(viewProfileDTO: ViewProfileDTO, viewerId: number, profileOwnerId: number): Observable<ResponseViewDTO> {
    return this.http.post<ResponseViewDTO>(`${this.url}/${this.base}/view/${viewerId}/${profileOwnerId}`, viewProfileDTO)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Retorna as visualizações de perfil de um usuário específico.
   *
   * @param profileOwnerId - O ID do dono do perfil cujas visualizações serão consultadas.
   * @returns Um Observable com a lista de visualizações e a quantidade de visualizadores.
   */
  getViewProfileById(profileOwnerId: number): Observable<ProfileViewDTO> {
    return this.http.get<ProfileViewDTO>(`${this.url}/${this.base}/view/${profileOwnerId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Manipula erros de requisição HTTP.
   *
   * @param error - O erro ocorrido durante a requisição HTTP.
   * @returns Um Observable que lança um erro formatado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}