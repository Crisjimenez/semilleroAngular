import { SessionService } from './../../../shared/services/session.service';
import { Seguidor } from './../../../shared/models/seguidor.interface';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../shared/services/usuario.service';
import { Usuario } from '../../../shared/models/usuario.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss']
})
export class AmigosComponent implements OnInit {

  amigos: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit(): void {

    // Consulta amigos o usuarios
    this.consultarAmigos();
  }

  consultarAmigos() {
    this.amigos = [];
    this.usuarioService.consultarUsuarios().subscribe(users => {
      this.amigos = users;
    }, error => console.error(error));
  }

  entrarPerfil(usuario: Usuario){
    const idUsuario = usuario.ID;
    this.usuarioService.setUsuario(usuario);
    this.router.navigate([`/perfil`], { queryParams: { idUsuario } });
  }

  agregarAmigo(usuario: Usuario){
    const addAmigo = {} as Seguidor;
    addAmigo.followed_id = usuario.ID;
    // id usuario conectado
    addAmigo.user_id = this.session.obtenerUsuario().ID;

    this.usuarioService.seguirUsuario(addAmigo).subscribe(add => {
      this.consultarAmigos();
    }, error => console.error(error));
  }

}
