import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth.service';

//Activando este guardian nos vamos a asegurar que 
//para acceder a la ruta solicitada el usuario es administrador

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private  authService: AuthService
    ) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
        if (this.authService.isLoggedIn) {
            //Está logueado
            return true;
        }

        // not está logueado redirecciona al login
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}