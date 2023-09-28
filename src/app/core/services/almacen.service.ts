import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Almacen } from '../models/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  public constructor(
    private http: HttpClient,
  ) {}

  public getAll(): any {
    return this.http.get<Almacen[]>(`${environment.apiSecureUrl}/almacen/all`);
  }

  public getById(id: string): any {
    return this.http.get<Almacen>(`${environment.apiSecureUrl}/almacen/${id}`);
  }

}
