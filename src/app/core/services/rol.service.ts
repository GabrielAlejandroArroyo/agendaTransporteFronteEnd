import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Rol } from '../models/rol';

@Injectable({ providedIn: 'root' })
export class RolService {

  public constructor(
    private http: HttpClient,
  ) { }

  public getAll(): any {
    return this.http.get<Rol[]>(`${environment.apiSecureUrl}/rol/all`);
  }

  public getById(id: string): Observable<Rol> {
    return this.http.get<Rol>(`${environment.apiSecureUrl}/rol/${id}`);
  }

  public create(rol: Rol): any {
    return this.http.post(`${environment.apiSecureUrl}/rol`, rol);
  }

  public updatePartial(id: string, changes: Partial<Rol>): any {
    return  this.http.put(`${environment.apiSecureUrl}/rol`, changes);
  }

  public update(rol: Rol): any {
    return  this.http.put(`${environment.apiSecureUrl}/rol`, rol);
  }

  public delete(id: string): any {
    return this.http.delete(`${environment.apiSecureUrl}/rol/${id}`);
  }

}
