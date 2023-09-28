import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/core/models/user';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

// Services
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-navadmin',
  styleUrls: ['./navadmin.component.scss'],
  templateUrl: './navadmin.component.html',
})
export class NavadminComponent {

  public profile: string;
  public usuario: User;

  public esTransportista: boolean = false;
  public esAdmin        : boolean = false;
  public esPlanificador : boolean = false;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    ) {
      this.usuario = this.authService.getCurrentUser;

      this.esTransportista = this.authService.esTransportista();
      this.esAdmin         = this.authService.esAdmin();
      this.esPlanificador  = this.authService.esPlanificador();

      if(this.authService.esTransportista()) {
        this.profile = this.authService.getCurrentUser.transportista.nombre;

      } else {
        this.profile = this.authService.getCurrentUser.usuarioRol[0].rol.descripcion;

      }

    }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);

  }

}

