import { SessionService } from './../../../shared/services/session.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicacionService } from './../../../shared/services/publicacion.service';
import { Comentario } from '../../../shared/models/comentario.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {

  @Output() agregoComentario = new EventEmitter<Boolean | null>();
  @Input() postId: number = 0;

  comentarios: Comentario[] = [];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private publicacionService: PublicacionService,
    private session: SessionService,
    private activeModal: NgbActiveModal
  ) {
    this.form = this.formBuilder.group({
      comment: ['', [
        Validators.required,
        Validators.minLength(3),
      ]]
    });
  }

  ngOnInit(): void {
    this.publicacionService.consultarPublicacionesPorId(this.postId).subscribe(pubs => {
      this.comentarios = pubs.comments;
    }, error => console.error(error));
  }

  comentar() {
    if (this.form.invalid) {
      Swal.fire(
        'Error!',
        'Debe ingresar un comentario',
        'error'
      );
      return
    }
    const values = this.form.value;
    let comment = values as Comentario;
    comment.post_id = this.postId;
    comment.user_id = this.session.obtenerUsuario().ID;

    this.publicacionService.crearComentario(comment).subscribe(cmm => {
      if (this.comentarios === undefined) {
        this.comentarios = [];
      }
      this.comentarios.push(cmm);
      this.form.get('comment')?.setValue('');
      this.agregoComentario.emit(true);
    },error => {
      console.error(error);
    });

  }

  cerrarModal() {
    this.activeModal.dismiss();
  }
}
