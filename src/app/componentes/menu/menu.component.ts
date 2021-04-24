import { Usuario } from './../../shared/models/usuario.class';
import { UsuarioService } from './../../shared/services/usuario.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  mostrarMenu = false;
  form: FormGroup;
  usuario: Usuario = {} as Usuario;

  constructor(
    private session: SessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    this.form = this.formBuilder.group({
      buscar: [''],
    });
  }

  ngOnInit(): void {
    const token = this.session.obtenerToken();
    this.usuario = this.session.obtenerUsuario();
    if (Boolean(token)) {
      this.mostrarMenu = true;
    }
    this.session.getExisteSession().subscribe(existe => {
      if (existe) {
        this.mostrarMenu = true;
      } else {
        this.mostrarMenu = false;
      }
    });
  }

  salir() {
    this.session.limpiarSession();
    this.router.navigate([`/login`]);
  }

  buscar() {
    const texto = this.form.get('buscar')?.value;
    if (!texto) {
      Swal.fire(
        'Error!',
        'Debe ingresar algun valor a buscar',
        'error'
      );
      return
    }
    this.usuarioService.subscripcionBuscar.next(texto);
    this.router.navigate([`/buscar`], { queryParams: { texto } });
  }

}
