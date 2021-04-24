import { SessionService } from './../../shared/services/session.service';
import { UsuarioService } from './../../shared/services/usuario.service';
import { Usuario } from '../../shared/models/usuario.class';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  perfil: Usuario = {} as Usuario;

  constructor(
    private session: SessionService,
    private activeRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    let idUsuario = Number(this.activeRoute.snapshot.queryParamMap.get('idUsuario'));
    if (idUsuario && idUsuario > 0) {
      this.perfil = this.usuarioService.getUsuario();
    } else {
      this.perfil = this.session.obtenerUsuario();
    }

  }

}
