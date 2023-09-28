import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Transportista } from '../models/transportista';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TransportistaService {

  public constructor(
        private router: Router,
        private http: HttpClient,
    ) {}

    public getAll(): any {
      return this.http.get<Transportista[]>(`${environment.apiSecureUrl}/transportista/all`);
    }

    public getById(id: string): any {
      return this.http.get<Transportista>(`${environment.apiSecureUrl}/transportista/${id}`);
    }

}
