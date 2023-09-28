import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  public constructor(
        private http: HttpClient,
    ) {}

    public getAll(): any {
      return this.http.get<User[]>(`${environment.apiSecureUrl}/usuario/all`);
    }

    public getById(id: string): any {
      return this.http.get<User>(`${environment.apiSecureUrl}/usuario/${id}`);
    }
    public create(user: User): any {
      return this.http.post(`${environment.apiSecureUrl}/usuario`, user);
    }

    public updatePartial(id: string, changes: Partial<User>): any {
      return  this.http.put(`${environment.apiSecureUrl}/usuario`, changes);
    }

    public update(user: User): any {
      return  this.http.put(`${environment.apiSecureUrl}/usuario`, user);
    }

    public delete(id: string): any {
      return this.http.delete(`${environment.apiSecureUrl}/usuario/${id}`);
    }

}
