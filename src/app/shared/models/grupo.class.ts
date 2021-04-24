import { Usuario } from './usuario.class';
import { CommonModel } from "./common-model.class";

export class Grupo extends CommonModel {
  public name: string = '';
  public description: string = '';
  public imageUrl: string = '';
  public creator_id: number = 0;
  public users: Usuario[] = [];
  public existeUsuario: boolean = false;

  constructor() {
    super();
  }
}

