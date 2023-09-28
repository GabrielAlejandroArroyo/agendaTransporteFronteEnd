import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Credential} from '../models/credential';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AppConstants } from '@app/app.constants';
import { AlertService } from './alert.service'
import { Transportista } from '../models/transportista';

@Injectable({ providedIn: 'root' })
export class AuthService {

  //@Output() public getLoggedUser: EventEmitter<any> = new EventEmitter();

  constructor(
      private router: Router,
      private http: HttpClient,
      private alertService: AlertService,
  ) {

  }

  public loginPaso1(credential: Credential): Observable<Credential> {
  
    return this.http.post<Credential>(`${environment.apiSecureUrl}/login`, credential)
    .pipe(map( ( credential ) => {
 
      //Si validó correctamente el usuario y la clave, entonces 
      //pasamos el paso 2 del login, que es la introducción de la contraseña
      if(credential.paso1 && credential.mensaje != '') {
        let mens = "Credenciales correctas. A continuación debe ingresar el token que recibirá por SMS.";
        this.alertService.info(mens);
        return credential;

      } else { //Error de validación de usuario y contraseña
        let mens = "Las credenciales no son válidas, vuelva a intentarlo.";
        this.alertService.error(mens);
        throw new Error(mens + "Error: " + credential.mensaje);

      }


      }));
  }


  public loginPaso2(credential: Credential): Observable<Credential> {
    return this.http.post<Credential>(`${environment.apiSecureUrl}/login`, credential)
      .pipe(map( ( credential ) => {
          
          //Finaliza el loggin y entra al portal si tiene permisos en la aplicación 
          if(credential.paso1 && credential.paso2 && credential.mensaje != '' && credential.tokenJWT) {
            if( this.tieneAlgunRol(credential.profile) ) {
              credential.password = null;
              credential.token = null;
              localStorage.setItem('credential', JSON.stringify(credential));
              localStorage.setItem('auth_token', credential.tokenJWT);
              localStorage.setItem('currentuser', JSON.stringify(credential.profile));
              return credential;
              
            } else { //No tiene permisos en la aplicación
              let mens = "Las credenciales no son válidas, vuelva a intentarlo.";
              this.alertService.error(mens);
              throw new Error(mens + "Error: " + credential.mensaje);
                
            }

          } else { //Error de validación de usuario, contraseña y token SMS
            let mens = "Las credenciales no son válidas, vuelva a intentarlo.";
            this.alertService.error(mens);
            throw new Error(mens + "Error: " + credential.mensaje);

          }

        }));
    }
  

  public logout(): void {
    localStorage.removeItem('credential');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentuser');
    this.router.navigate(['/login']);
  }

  public get getCurrentUser(): User {
    //return this.currentUserSubject.value;
    return JSON.parse(localStorage.getItem('currentuser'));
  }

  public get getCurrentCredential(): Credential {
    //return this.currentCredentialSubject.value;
    return JSON.parse(localStorage.getItem('credential'));
  }

  public get getCurrentJwtToken(): string {
    return localStorage.getItem('auth_token');
  }

  public get isLoggedIn(): any {
    try
    {
      var usu:  User =        this.getCurrentUser;
      var cred: Credential =  this.getCurrentCredential;
      var tk:   string =      this.getCurrentJwtToken;

      //Para que esté logueado se debe contemplar el login ok y que tenga roles en la aplicación
      if(usu && cred && tk)
      {
        return true;
      }
      return false;
    }
    catch(ex)
    { return false; }
  }

  public esAdmin(): boolean  {
    return this.existeRol(AppConstants.AdminRol, this.getCurrentUser);
  }

  public esTransportista(): boolean  {
    return this.existeRol(AppConstants.TransportistaRol, this.getCurrentUser);
  }

  public esPlanificador(): boolean  {
    return this.existeRol(AppConstants.PlanificadorRol, this.getCurrentUser);
  }

  public get getTransportista(): Transportista {
    let user   = this.getCurrentUser;
    let transp = null;

    if(this.esTransportista())
    {
      if(user.transportista) {
        transp = user.transportista;
      }
    }
    return transp;
  }


  private existeRol( rol: string, usu: User ): boolean  {
  
    var ret:  boolean = false;
    var cant: number  = 0;
    try
    {

      if(usu.usuarioRol) //Si hay roles cargados
      {
        usu.usuarioRol.forEach( usuRol => {
          if( usuRol.rol != null && usuRol.rol.descripcion != null ) cant++;
          if( usuRol.rol.descripcion === rol){
            ret = true;
          }
  
        })
      }
    }
    catch(ex)
    { 
      console.log("authService.ts => existeRol() => Error => ", ex);
      ret = false;
    }
    return ret;
  }


  private tieneAlgunRol( usu: User ): boolean  {
    var cant: number  = 0;
    try
    {
      if(usu.usuarioRol) //Si hay roles cargados
      {
        usu.usuarioRol.forEach( usuRol => {
          if(usuRol.rol) {
            if(usuRol.rol.idRol) {
              if(usuRol.rol.descripcion) {
                cant++;
              }
            }
          }
        });
      }
    }
    catch(ex)
    { 
      console.log("authService.ts => tieneAlgunRol() => Error => ", ex);
      cant = 0;
    }      
    return cant > 0;
  }

}
