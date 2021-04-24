import { Publicacion } from './publicacion.class';

export interface PaginacionPublicacion {
  next: string;
  count: number;
  prev: string;
  results: Publicacion[];

}
