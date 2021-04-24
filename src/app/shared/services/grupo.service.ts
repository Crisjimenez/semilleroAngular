import { GrupoUsuario } from './../models/grupo-usuario.interface';
import { Grupo } from './../models/grupo.class';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  URL = environment.BASE_API_URL;

  constructor(
    private http: HttpClient
  ) { }

  consultarGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.URL}/groups`);
  }

  crearGrupo(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(`${this.URL}/groups`, grupo);
  }

  agregarUsuarioGrupo(usuarioGrupo: GrupoUsuario): Observable<string | null> {
    return this.http.post<string | null >(`${this.URL}/groups/append`, usuarioGrupo);
  }

}
