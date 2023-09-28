import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

// Services
import { PlanificacionCabecera } from '../models/planificacion_cabecera';

// Models
import { Estado } from '../models/Estado';
import { Transportista } from '../models/transportista';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionCabeceraService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAll(): any {
    return this.http.get<PlanificacionCabecera[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/all`);
  }

  public getById(id: string): any {
    return this.http.get<PlanificacionCabecera>(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/${id}`);
  }

  public getByEstado(estado: string): any {
    return this.http.get<PlanificacionCabecera[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/estado/${estado}`);
  }



  public create(viaje: PlanificacionCabecera): any {
    return this.http.post(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje`, viaje);
  }

  public update(viaje: PlanificacionCabecera): any {
    return  this.http.put(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje`, viaje);
  }

  public delete(id: string): any {
    return this.http.delete(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/${id}`);
  }

  // Busca los viajes pendientes por transportista
  public getPendientesByTransportista(transportista: Transportista): any {
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlanificacionCabecera[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/pendiente/transportista/${transportista.codigo}`);
  }

  // Busca los viajes por estado por transportista
  public getByEstadoTransportista(estado: Estado, transportista: Transportista): any {
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlanificacionCabecera[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/estado/${estado.codigo}/${transportista.codigo}`);
  }

  // Busca los viajes por estado asignado por transportista
  public getAsignadosByTransportista(transportista: Transportista): any {
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlanificacionCabecera[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/asignados/transportista/${transportista.codigo}`);
  }

  // Busca los viajes por estado deingresdo hacia adelante
  public getIngresadosByTransportista(transportista: Transportista): any {
    let estados = '20-21-25-30-40-60-99-80';
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlanificacionCabecera[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViaje/inEstado/${estados}/${transportista.codigo}`);
  }


}
