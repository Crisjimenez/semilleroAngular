import { Reaccion } from './../models/reaccion.interface';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReaccionService {

  URL = environment.BASE_API_URL;

  constructor(
    private http: HttpClient
  ) { }

  agregarReaccion(reaccion: Reaccion): Observable<string | null> {
    return this.http.post<string | null>(`${this.URL}/reactions`, reaccion);
  }

}
