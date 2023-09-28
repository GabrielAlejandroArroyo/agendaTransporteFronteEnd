import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Tractor } from '../models/tractor';

@Injectable({
  providedIn: 'root'
})
export class TractorService {

  public constructor(
    private http: HttpClient,
  ) {}

  public getAll(): any {
    return this.http.get<Tractor[]>(`${environment.apiSecureUrl}/tractor/all`);
  }

  public getByTransportista(idtransportista: string, idalmacen: string): any {
    return this.http.get<Tractor[]>(`${environment.apiSecureUrl}/tractor/allByTrasportistaAlmacen/{codigoTransportista}/{codigoAlmacen}​​​​?codigoAlamcen=${idalmacen}&codigoTransportista=${idtransportista}`);
  }

  public getById(id: string): any {
    return this.http.get<Tractor>(`${environment.apiSecureUrl}/tractor/${id}`);
  }

}
