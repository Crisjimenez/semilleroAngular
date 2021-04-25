import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';

@Injectable()
export class GuardiaRutasService implements CanActivate {

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const token = this.session.obtenerToken();
    if (Boolean(token)) {
      return true;
    } else {
      this.session.limpiarSession();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
