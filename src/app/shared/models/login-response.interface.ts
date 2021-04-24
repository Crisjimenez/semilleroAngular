import { Usuario } from './usuario.class';

export interface LoginResponse {
  token: string;
  user: Usuario;
}

