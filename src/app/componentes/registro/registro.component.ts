import { ComponentUtil } from './../../shared/utils/component.util';
import { UsuarioService } from './../../shared/services/usuario.service';
import { Usuario } from '../../shared/models/usuario.class';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent extends ComponentUtil implements OnInit {

  form: FormGroup;
  enviado = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    super();
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    });
  }

  ngOnInit(): void {
  }

  campoValido(campo: string, error: string): boolean {
    return this.campoValidoUtil(campo, error, this.form);
  }

  guardar() {
    if (this.form.invalid) {
      Swal.fire(
        'Error!',
        'Formulario incompleto',
        'error'
      );
    } else {
      const values = this.form.value;
      const registro = values as Usuario;

      this.usuarioService.registro(registro).subscribe(user => {

        this.router.navigate([`/login`]);

        Swal.fire(
          'Registro exitoso.',
          `Registro almacenado correctamente`,
          'success'
        );
      }, error => {
        console.error(error);
      });
    }
  }

  volver() {
    this.router.navigate([`/login`]);
  }

}
