import { PaginacionPublicacion } from './../models/paginacion-publicacion.interface';
import { environment } from './../../../environments/environment.prod';
import { Comentario } from '../models/comentario.interface';
import { Publicacion } from '../models/publicacion.class';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  URL = environment.BASE_API_URL;
  subscripcionPost = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  obtenerSubscripcion() {
    return this.subscripcionPost.asObservable();
  }

  consultarPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.URL}/posts`);
  }

  consultarPublicacionesPaginadas(literal: string = '/posts?limit=5&offset=0'): Observable<PaginacionPublicacion> {
    return this.http.get<PaginacionPublicacion>(`${this.URL}${literal}`);
  }

  consultarPublicacionesPorUsuario(idUsuario: number): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.URL}/posts/user/${idUsuario}`);
  }

  consultarPublicacionesPorId(id: number): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.URL}/posts/${id}`);
  }

  crearPublicacion(publicacion: Publicacion): Observable<Publicacion> {
    return this.http.post<Publicacion>(`${this.URL}/posts`, publicacion);
  }

  crearComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.URL}/comments`, comentario);
  }

}
