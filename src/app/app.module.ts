import { HomeComponent } from './componentes/home/home.component';
import { environment } from './../environments/environment';
import { GuardiaRutasService } from './shared/services/guardia-rutas.service';
import { InterceptorService } from './shared/services/interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicacionesComponent } from './componentes/home/publicaciones/publicaciones.component';
import { ComentariosComponent } from './componentes/home/comentarios/comentarios.component';
import { LoginComponent } from './componentes/login/login.component';
import { routing } from './shared/routes/app_routes';
import { MenuComponent } from './componentes/menu/menu.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AmigosComponent } from './componentes/home/amigos/amigos.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { GruposComponent } from './componentes/home/grupos/grupos.component';
import { BuscadorComponent } from './componentes/home/buscador/buscador.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CrearGrupoComponent } from './componentes/home/crear-grupo/crear-grupo.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PublicacionesComponent,
    ComentariosComponent,
    LoginComponent,
    MenuComponent,
    RegistroComponent,
    PerfilComponent,
    AmigosComponent,
    GruposComponent,
    HomeComponent,
    BuscadorComponent,
    CrearGrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    GuardiaRutasService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
