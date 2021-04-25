import { Usuario } from '../models/usuario.class';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  existeSession = new Subject<Boolean>();

  constructor() { }

  guardarToken(token: string) {
    this.setExisteSession(true);
    window.sessionStorage.setItem('app-posts-token', token);
  }

  obtenerToken(): string | null {
    return window.sessionStorage.getItem('app-posts-token');
  }

  guardarUsuario(usuario: any) {
    window.sessionStorage.setItem('app-posts-usuario-objeto', JSON.stringify(usuario));
  }

  obtenerUsuario(): Usuario {
    const usuarioJson = window.sessionStorage.getItem('app-posts-usuario-objeto') || '';
    let usuarioRetorno = {} as Usuario;
    if (Boolean(usuarioJson)) {
      usuarioRetorno = JSON.parse(usuarioJson);
    }
    return usuarioRetorno;
  }

  limpiarSession() {
    window.sessionStorage.clear();
    this.setExisteSession(false);
  }

  private setExisteSession(existeSession: Boolean) {
    this.existeSession.next(existeSession);
  }

  public getExisteSession() {
    return this.existeSession.asObservable();
  }

}
