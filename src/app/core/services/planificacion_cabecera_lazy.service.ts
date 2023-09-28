import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

// Services
import { PlanificacionCabeceraLazy } from '../models/planificacion_cabecera_lazy';

// Models
import { Estado } from '../models/Estado';
import { Transportista } from '../models/transportista';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionCabeceraLazyService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAll(): any {
    return this.http.get<PlanificacionCabeceraLazy[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/all`);
  }

  public getVigentesAll(): any {
    return this.http.get<PlanificacionCabeceraLazy[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/vigentesALL`);
  }

  public getById(id: string): any {
    return this.http.get<PlanificacionCabeceraLazy>(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/${id}`);
  }

  public getByEstado(estado: string): any {
    return this.http.get<PlanificacionCabeceraLazy[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/estado/${estado}`);
  }

  public create(viaje: PlanificacionCabeceraLazy): any {
    return this.http.post(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy`, viaje);
  }

  public update(viaje: PlanificacionCabeceraLazy): any {
    return  this.http.put(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy`, viaje);
  }

  public delete(id: string): any {
    return this.http.delete(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/${id}`);
  }

  // Busca los viajes pendientes por transportista
  public getPendientesByTransportista(transportista: Transportista): any {
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlanificacionCabeceraLazy[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/pendiente/transportista/${transportista.codigo}`);
  }

  // Busca los viajes por estado por transportista
  public getByEstadoTransportista(estado: Estado, transportista: Transportista): any {
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlanificacionCabeceraLazy[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/estado/${estado.codigo}/${transportista.codigo}`);
  }

  // Busca los viajes por estado asignado por transportista
  public getAsignadosByTransportista(transportista: Transportista): any {
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlanificacionCabeceraLazy[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/asignados/transportista/${transportista.codigo}`);
  }

  // Busca los viajes por estado deingresdo hacia adelante
  public getIngresadosByTransportista(transportista: Transportista): any {
    let estados = '20-21-25-30-40-60-99-80';
    // tslint:disable-next-line: max-line-length
    return this.http.get<PlanificacionCabeceraLazy[]>(`${environment.apiSecureUrl}/cabeceraPlanificacionViajeLazy/inEstado/${estados}/${transportista.codigo}`);
  }

}
