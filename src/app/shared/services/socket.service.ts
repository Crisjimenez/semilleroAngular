import { PublicacionService } from './publicacion.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: WebSocket

  constructor(
    private publicacionService: PublicacionService,
  ) {

    this.socket = new WebSocket('ws://18.189.21.84:5050/ws');

    this.socket.onopen = evt => {
      console.log('Abierto');
    }

    this.socket.onclose = evt => {
      console.log('Cerrado');
    }

    this.socket.onmessage = evt => {
      const data = JSON.parse(evt.data);
      this.publicacionService.subscripcionPost.next(data);
    }
  }
}
