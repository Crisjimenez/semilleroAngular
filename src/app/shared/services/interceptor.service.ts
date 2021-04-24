import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.session.obtenerToken();
    if (!Boolean(token)) {
      request = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
      });
    } else {
      request = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request).pipe(
      tap(() => { }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
