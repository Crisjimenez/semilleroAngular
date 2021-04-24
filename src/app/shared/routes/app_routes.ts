import { HomeComponent } from './../../componentes/home/home.component';
import { GruposComponent } from './../../componentes/home/grupos/grupos.component';
import { GuardiaRutasService } from '../services/guardia-rutas.service';
import { PerfilComponent } from '../../componentes/perfil/perfil.component';
import { RegistroComponent } from '../../componentes/registro/registro.component';
import { LoginComponent } from '../../componentes/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from 'src/app/componentes/home/buscador/buscador.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  { path: 'home', component: HomeComponent, canActivate: [GuardiaRutasService] },
  { path: 'grupo', component: GruposComponent, canActivate: [GuardiaRutasService] },
  { path: 'perfil', component: PerfilComponent, canActivate: [GuardiaRutasService] },
  { path: 'buscar', component: BuscadorComponent, canActivate: [GuardiaRutasService] },
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
