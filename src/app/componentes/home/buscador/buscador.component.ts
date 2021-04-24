import { SessionService } from './../../../shared/services/session.service';
import { Seguidor } from './../../../shared/models/seguidor.interface';
import { Usuario } from './../../../shared/models/usuario.class';
import { UsuarioService } from './../../../shared/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  resultados: Usuario[] = [];
texto: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit(): void {

    this.texto = String(this.activeRoute.snapshot.queryParamMap.get('texto'));
    if (this.texto) {
      this.buscar();
    }

    this.usuarioService.obtenerSubscripcion().subscribe(texto => {
      this.texto = texto;
      this.buscar();
    }, error => console.error(error));

  }

  buscar() {
    this.resultados = [];
    this.usuarioService.buscar(this.texto).subscribe(datos => {
      this.resultados = datos;
    }, error => console.error(error));
  }

  entrarPerfil(usuario: Usuario){
    const idUsuario = usuario.ID;
    this.usuarioService.setUsuario(usuario);
    this.router.navigate([`/perfil`], { queryParams: { idUsuario } });
  }

  agregarAmigo(usuario: Usuario) {
    const addAmigo = {} as Seguidor;
    addAmigo.followed_id = usuario.ID;
    addAmigo.user_id = this.session.obtenerUsuario().ID;

    this.usuarioService.seguirUsuario(addAmigo).subscribe(add => {
      this.buscar();
    }, error => console.error(error));
  }

}
