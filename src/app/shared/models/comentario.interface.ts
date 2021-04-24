import { Usuario } from './usuario.class';

export interface Comentario {
  comment: string;
  post_id: number;
  user_id: number;
  User: Usuario;

}
