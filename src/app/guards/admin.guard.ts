import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth.service';
import { AlertService } from '@app/core/services/alert.service';

//Activando este guardian nos vamos a asegurar que 
//para acceder a la ruta solicitada el usuario es administrador

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isLoggedIn && this.authService.esAdmin()) {
      return true;
    }
    else
    {
      //Mensaje, debe estar logueado y debe tener permisos de administrador
      this.alertService.error("Se requieren permisos de administrador para entrar a ésta página.")
      return false;
    }

  }

  // esAdmin(usuario: User): boolean  {
    
  //   var ret: boolean = false;

  //   if(usuario.usuarioRol) //Si hay roles cargados
  //   {
  //     usuario.usuarioRol.forEach( usuRol => {
  //       if( usuRol.rol.descripcion === AppConstants.AdminRol){
  //         ret = true;
  //       }

  //     })
  //   }
  //   return ret;
  // }



}
