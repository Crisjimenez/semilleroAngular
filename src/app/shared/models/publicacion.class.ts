import { Reaccion } from './reaccion.interface';
import { Grupo } from './grupo.class';
import { CommonModel } from './common-model.class';
import { Comentario } from './comentario.interface';
import { Usuario } from './usuario.class';

export class Publicacion extends CommonModel {

  public posted_text: string = '';
  public image_url: string = '';
  public user_id: number = 0;
  public user: Usuario = {} as Usuario;
  public comments: Comentario[] = [];
  public group: Grupo = {} as Grupo;
  public reactions: Reaccion[] = [];

  // no postman
  public numLikes: number = 0;
  public numComments: number = 0;
  public meGusto: boolean = false;

  constructor() {
    super();
  }

  tieneMeGusta(idUsuario: number): boolean {
    this.meGusto = this.reactions?.some(reac => reac.user_id === idUsuario);
    return this.meGusto
  }

  contComentarios(): number {
    this.numComments = 0;
    if (this.comments) {
      this.numComments = this.comments.length;
    }
    return this.numComments;
  }

  contLikes(): number {
    this.numLikes = 0;
    if (this.reactions) {
      this.numLikes = this.reactions.length;
    }
    return this.numLikes;
  }

  agregarReaccion(reaction: Reaccion, idUsuario: number) {
    if (this.ID === reaction.post_id) {
      if (this.reactions) {
        this.reactions.push(reaction);
      } else {
        this.reactions = [reaction];
      }
      this.contLikes();
      this.tieneMeGusta(idUsuario);
    }
  }

  quitarReaccion(idUsuario: number) {
    if (!this.reactions) {
      return;
    }
    const reaccion = this.reactions.find(r => {
      return r.user_id === idUsuario;
    });

    if (reaccion) {
      this.reactions.splice(this.reactions.indexOf(reaccion), 1);
      this.contLikes();
      this.tieneMeGusta(idUsuario);
    }
  }

  agregarComentario(coment: Comentario) {
    if (this.ID === coment.post_id) {
      if (this.comments) {
        this.comments.push(coment);
      } else {
        this.comments = [coment];
      }
      this.contComentarios();
    }
  }
}
