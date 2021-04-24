import { Publicacion } from './../../../shared/models/publicacion.class';
import { Reaccion } from './../../../shared/models/reaccion.interface';
import { ReaccionService } from './../../../shared/services/reaccion.service';
import { finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { SessionService } from './../../../shared/services/session.service';
import { Usuario } from './../../../shared/models/usuario.class';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Comentario } from '../../../shared/models/comentario.interface';
import { ComentariosComponent } from './../../home/comentarios/comentarios.component';
import { PublicacionService } from '../../../shared/services/publicacion.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {

  @Input() idUsuario = 0;
  usuario: Usuario = {} as Usuario;
  publicaciones: Publicacion[] = [];
  form: FormGroup;
  url: Observable<any> = of("");
  pathImagen: string = '';
  imagen: any;
  siguientePagina: any = undefined;
  existeSiguientePagina = true;

  constructor(
    private formBuilder: FormBuilder,
    private publicacionService: PublicacionService,
    private modal: NgbModal,
    private session: SessionService,
    private reaccionService: ReaccionService,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      posted_text: ['']
    });
  }

  ngOnInit(): void {
    // Consulta publicaciones
    this.cargarListaPublicaciones();
    // cargamos el usuario conectado
    this.usuario = this.session.obtenerUsuario();
    //subscripcion al socket
    this.suscripcionSocket();

  }

  suscripcionSocket() {
    this.publicacionService.obtenerSubscripcion().subscribe(data => {
      this.mostrarNotificacion(data.event);
      this.publicaciones.forEach(pub => {

        if (data.event === 'new::reaction') {
          pub.agregarReaccion(data.reaction, this.usuario.ID);
          return;
        }

        if (data.event === 'remove::reaction') {
          pub.quitarReaccion(this.usuario.ID);
          return;
        }

        if (data.event === 'new::comment') {
          pub.agregarComentario(data.comment);
          return;
        }

        if (data.event === 'new::post') {
          let publ = new Publicacion();
          Object.assign(publ, data.post);
          publ.contComentarios();
          publ.contLikes();
          publ.tieneMeGusta(this.idUsuario);
          this.publicaciones.push(publ);
          return;
        }
      });
    });
  }

  cargarListaPublicaciones() {

    if (this.idUsuario && this.idUsuario > 0) {
      this.publicaciones = [];
      this.publicacionService.consultarPublicacionesPorUsuario(this.idUsuario).subscribe(pubs => {
        if (pubs) {
          let publicacionesAlt = pubs.map(pub => {
            let publ = new Publicacion();
            Object.assign(publ, pub);

            publ.contComentarios();
            publ.contLikes();
            publ.tieneMeGusta(this.idUsuario);
            return publ;
          });

          this.publicaciones = publicacionesAlt;
        }

      }, error => console.error(error));

    } else {
      if (this.existeSiguientePagina) {
        this.publicacionService.consultarPublicacionesPaginadas(this.siguientePagina).subscribe(pubs => {
          if (!pubs) {
            return;
          }
          if (pubs.next) {
            this.siguientePagina = pubs.next;
            this.existeSiguientePagina = true;
          } else {
            this.siguientePagina = '';
            this.existeSiguientePagina = false;
          }

          let publicacionesAlt = pubs.results.map(pub => {
            //let publ = pub;

            let publ = new Publicacion();
            Object.assign(publ, pub);
            publ.contComentarios();
            publ.contLikes();
            publ.tieneMeGusta(this.usuario.ID);
            return publ;
          });

          this.publicaciones = this.publicaciones.concat(publicacionesAlt);
        }, error => console.error(error));
      }
    }
  }

  publicarPost() {
    const publicacionTexto = this.form.get('posted_text')?.value;

    if (!publicacionTexto && !this.pathImagen) {
      Swal.fire(
        'Error!',
        'Debe ingresar una imagen o un comentario.',
        'error'
      );
      return
    }

    // si guarda con imagen
    if (this.pathImagen) {
      // Guardamos la imagen
      const ref = this.storage.ref(this.pathImagen);
      const tarea = this.storage.upload(this.pathImagen, this.imagen);

      tarea.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(urlImg => {
            this.guardarPublicacion(urlImg);
          });
        })
      ).subscribe();

      // guarda sin imagen
    } else {
      this.guardarPublicacion();
    }

  }

  guardarPublicacion(rutaImagen: string = '') {

    const values = this.form.value;
    let publicacion = values as Publicacion;
    publicacion.user_id = this.usuario.ID;
    publicacion.user = this.usuario;
    publicacion.image_url = rutaImagen;

    this.publicacionService.crearPublicacion(publicacion).subscribe(cmm => {
      this.form.get('posted_text')?.setValue('');
      this.pathImagen = '';
      this.cargarListaPublicaciones();
    }, error => {
      console.error(error);
    });
  }

  addImagen(evt: any) {
    this.imagen = evt.target.files[0];
    const partes = this.imagen.name.split('.');
    const extension = partes[partes.length - 1];
    const nombre = `${Date.now()}.${extension}`;
    this.pathImagen = `uploads/${nombre}`;
  }

  addMeGusta(publicacion: Publicacion) {
    const reaccion: Reaccion = {} as Reaccion;
    reaccion.post_id = publicacion.ID;
    reaccion.user_id = this.usuario.ID;
    this.reaccionService.agregarReaccion(reaccion).subscribe(resp => {
      this.cargarListaPublicaciones();
    }, error => console.error(error));
  }

  comentar(comentarios: Comentario[], postId: number) {
    const modalRef = this.modal.open(ComentariosComponent,
      { backdrop: 'static', size: 'lg', windowClass: 'modal' });

    modalRef.componentInstance.postId = postId;
    modalRef.componentInstance.agregoComentario.subscribe((dato: Boolean | null) => {
      if (dato) {
        this.cargarListaPublicaciones();
      }
    });
  }

  mostrarNotificacion(tipo: string){
    if (tipo === 'new::reaction') {
      this.toastr.success('Me gusta', `agragaron me gusta.`);
      return;
    }

    if (tipo === 'remove::reaction') {
      this.toastr.success('Me gusta', `quitaron me gusta.`);
      return;
    }

    if (tipo === 'new::comment') {
      this.toastr.success('Comentaron', `Alguien comento tu publicación.`);
      return;
    }

    if (tipo === 'new::post') {
      this.toastr.success('Publicación', `Alguien agrego una publicación.`);
      return;
    }
  }


}
