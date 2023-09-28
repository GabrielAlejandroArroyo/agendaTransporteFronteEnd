import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PlanificacionDetalle } from '../models/planificacion_detalle';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionDetalleService {

  constructor(
    private http: HttpClient,
  ) { }

  public getById(id: string): any {
    return this.http.get<PlanificacionDetalle>(`${environment.apiSecureUrl}/detallePlanificacionViaje/${id}`);
  }

  public create(viajedetalle: PlanificacionDetalle): any {
    return this.http.post(`${environment.apiSecureUrl}/detallePlanificacionViaje`, viajedetalle);
  }

  public update(viajedetalle: PlanificacionDetalle): any {
    return  this.http.put(`${environment.apiSecureUrl}/detallePlanificacionViaje`, viajedetalle);
  }

  public delete(id: string): any {
    return this.http.delete(`${environment.apiSecureUrl}/detallePlanificacionViaje/${id}`);
  }

  public getByIdcabecera(id: string): any {
    return this.http.get<PlanificacionDetalle[]>(`${environment.apiSecureUrl}/detallePlanificacionViaje/porIdCabeceraPlanificacion/${id}`);
  }



}
