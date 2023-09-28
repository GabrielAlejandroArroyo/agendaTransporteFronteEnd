import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Equipo } from '../models/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  public constructor(
    private http: HttpClient,
  ) {}

  public getAll(): any {
    return this.http.get<Equipo[]>(`${environment.apiSecureUrl}/equipo/all`);
  }

  public getByTransportista(idplanifacion: string , idtransportista: string ): any {
    return this.http.get<Equipo[]>(`${environment.apiSecureUrl}/equipo/allDisponibles/{idCabeceraPlanificacion}/{codigoTransportista}​​​​?codigoTransportista=${idtransportista}&idCabeceraPlanificacionViaje=${idplanifacion}`);
  }

  public getById(id: string): any {
    return this.http.get<Equipo>(`${environment.apiSecureUrl}/equipo/${id}`);
  }

}
