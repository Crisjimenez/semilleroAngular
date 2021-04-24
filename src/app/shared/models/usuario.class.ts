import { CommonModel } from "./common-model.class";

export class Usuario extends CommonModel {
  public name: string = '';
  public email: string = '';
  public avatar: string = '';
  public password: string = '';

  constructor() {
    super();
  }
}

