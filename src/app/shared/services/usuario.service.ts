import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario.class';
import { Injectable } from '@angular/core';
import { Seguidor } from '../models/seguidor.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = environment.BASE_API_URL;
  private usuario: Usuario = {} as Usuario;
  subscripcionBuscar = new Subject<any>();

  constructor(
    private http: HttpClient,
  ) { }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.URL}/users`, usuario);
  }

  seguirUsuario(addAmigo: Seguidor): Observable<string | null> {
    return this.http.post<string | null>(`${this.URL}/users/follow`, addAmigo);
  }

  consultarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.URL}/users`);
  }

  buscar(texto: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.URL}/search?text=${texto}`);
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  getUsuario(): Usuario {
    return this.usuario;
  }

  obtenerSubscripcion() {
    return this.subscripcionBuscar.asObservable();
  }

}
