import { SocketService } from './shared/services/socket.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'facebook';

  constructor(
    private socketService: SocketService
  ) {

  }
}
