import { Usuario } from '../models/usuario.class';
import { LoginResponse } from '../models/login-response.interface';
import { Login } from '../models/login.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  URL = environment.BASE_API_URL;

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) { }

  login(login: Login): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      this.http.post<LoginResponse>(`${this.URL}/auth`, login).subscribe(respuesta => {

        this.session.guardarToken(respuesta.token);
        this.session.guardarUsuario(respuesta.user);
        resolve(respuesta.user);
      }, error => {
        console.error(error);
        Swal.fire(
          'Error',
          "Ocurrió un error iniciando sesión",
          'error'
        );
        reject(error);
      });
    })
  }
}

