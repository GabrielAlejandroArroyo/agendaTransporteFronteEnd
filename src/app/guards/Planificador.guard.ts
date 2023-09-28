import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth.service';
import { AlertService } from '@app/core/services/alert.service';


@Injectable({
  providedIn: 'root',
})
export class PlanificadorGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isLoggedIn && this.authService.esPlanificador()) {
      return true;
    }
    else
    {
      //Mensaje, debe estar logueado y debe tener permisos de administrador
      this.alertService.error("Se requieren permisos de Planificador para entrar a ésta página.")
      return false;
    }

  }

}
