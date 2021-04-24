import { ComponentUtil } from './../../shared/utils/component.util';
import { Router } from '@angular/router';
import { AutenticacionService } from './../../shared/services/autenticacion.service';
import { Login } from '../../shared/models/login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ComponentUtil implements OnInit {

  form: FormGroup;

  constructor(
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')
      ]],
      password: ['', [Validators.required]]
      });

  }

  ngOnInit(): void {}

  campoValido(campo: string, error: string): boolean {
    return this.campoValidoUtil(campo, error, this.form);
  }

  iniciarSesion() {
    if (this.form.invalid) {
      Swal.fire(
        'Error!',
        'Formulario incompleto',
        'error'
      );
      return
    }
    const values = this.form.value;
    const login = values as Login;

    this.autenticacionService.login(login).then(user => {
      this.router.navigate([`/home`]);

      Swal.fire(
        'Login exitoso.',
        `Bienvenido ${user.name}`,
        'success'
      );
    }).catch(error => {
      console.error(error);
    });

  }

  abrirForm(){
    this.router.navigate([`/registro`]);
  }

}
