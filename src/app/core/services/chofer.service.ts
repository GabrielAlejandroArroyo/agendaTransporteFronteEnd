import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Chofer } from '../models/chofer';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {

  public constructor(
    private http: HttpClient,
  ) {}

  public getAll(): any {
    return this.http.get<Chofer[]>(`${environment.apiSecureUrl}/chofer/all`);
  }

  public getByTransportista(idtransportista: string, idalmacen: string ): any {
    return this.http.get<Chofer[]>(`${environment.apiSecureUrl}/chofer/allByTrasportistaAlmacen/{​​​​​codigoTransportista}​​​​​/{​​​​​codigoAlmacen}​​​​​?codigoAlamcen=${idalmacen}&codigoTransportista=${idtransportista}`);
  }

  public getById(id: string): any {
    return this.http.get<Chofer>(`${environment.apiSecureUrl}/chofer/${id}`);
  }

}
