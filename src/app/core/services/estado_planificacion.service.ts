import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EstadoPlanificacion } from '../models/estado_planificacion';

@Injectable({
  providedIn: 'root'
})
export class EstadoPlanificacionService {

  public constructor(
    private http: HttpClient,
  ) {}

  public getAll(): any {
    return this.http.get<EstadoPlanificacion[]>(`${environment.apiSecureUrl}/estadoPlanificacion/all`);
  }

  public getById(id: string): any {
    return this.http.get<EstadoPlanificacion>(`${environment.apiSecureUrl}/estadoPlanificacion/${id}`);
  }

}
