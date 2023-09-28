import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Destino } from '../models/destino';

@Injectable({ providedIn: 'root' })
export class DestinoService {

  public constructor(
        private http: HttpClient,
    ) {}

    public getAll(): any {
      return this.http.get<Destino[]>(`${environment.apiSecureUrl}/destino`);
    }

    public getById(id: string): any {
      return this.http.get<Destino>(`${environment.apiSecureUrl}/destino/${id}`);
    }
}
