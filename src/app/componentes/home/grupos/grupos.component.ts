import { CrearGrupoComponent } from './../crear-grupo/crear-grupo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from './../../../shared/services/session.service';
import { GrupoUsuario } from './../../../shared/models/grupo-usuario.interface';
import { GrupoService } from './../../../shared/services/grupo.service';
import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/shared/models/grupo.class';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  grupos: Grupo[] = [];
  idUsuario = 0;

  constructor(
    private grupoService: GrupoService,
    private session: SessionService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.idUsuario = this.session.obtenerUsuario().ID;

    // Consulta grupos
    this.consultarGrupos();
  }

  consultarGrupos() {
    this.grupos = [];
    this.grupoService.consultarGrupos().subscribe(groups => {
      if (groups) {
        this.grupos = groups;
      }
    }, error => console.error(error));
  }

  entrarGrupo(grupo: Grupo) {
    const addGrupo = {} as GrupoUsuario;
    addGrupo.group_id = grupo.ID;
    addGrupo.user_id = this.idUsuario;

    this.grupoService.agregarUsuarioGrupo(addGrupo).subscribe(add => {
      this.consultarGrupos();
    }, error => console.error(error));
  }

  existeUsuarioEnGrupo(grup: Grupo): boolean {
    let existe = false;
    if (grup.users) {
      grup.users.forEach(element => {
        if (element.ID === this.idUsuario) {
          existe = true;
        }
      });
    }

    return existe;
  }

  direccionarCrearGrupo() {
    const modalRef = this.modal.open(CrearGrupoComponent,
      { backdrop: 'static', size: 'md', windowClass: 'modal' });

    modalRef.componentInstance.agregoGrupo.subscribe((dato: Boolean | null) => {
      if (dato) {
        this.consultarGrupos();
      }
    });
  }


}

