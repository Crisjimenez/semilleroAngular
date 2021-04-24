import { ComponentUtil } from './../../../shared/utils/component.util';
import { SessionService } from './../../../shared/services/session.service';
import { Grupo } from 'src/app/shared/models/grupo.class';
import Swal from 'sweetalert2';
import { GrupoService } from './../../../shared/services/grupo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.scss']
})
export class CrearGrupoComponent extends ComponentUtil implements OnInit {

  @Output() agregoGrupo = new EventEmitter<Boolean | null>();

  form: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private grupoService: GrupoService,
    private session: SessionService,
  ) {
    super();
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(3),
      ]]
    });
  }

  ngOnInit(): void {

  }

  guardar(){
    if (this.form.invalid) {
      Swal.fire(
        'Error!',
        'Formulario incompleto',
        'error'
      );
      return
    }
    const values = this.form.value;
    let grupo = values as Grupo;
    grupo.creator_id = this.session.obtenerUsuario().ID;

    this.grupoService.crearGrupo(grupo).subscribe(gru => {

      this.form.get('name')?.setValue('');
      this.form.get('description')?.setValue('');
      this.cerrarModal()
      Swal.fire(
        'Creación exitosa.',
        `Grupo ${grupo.name}`,
        'success'
      );
      this.agregoGrupo.emit(true);
    },error => {
      console.error(error);
    });
  }

  cerrarModal(){
    this.activeModal.dismiss();
  }

  campoValido(campo: string, error: string): boolean {
    return this.campoValidoUtil(campo, error, this.form);
  }

}
