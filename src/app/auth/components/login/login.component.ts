import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthService } from '@app/core/services/auth.service';

// Model
import { Credential } from '@app/core/models/credential';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  public hidePass   = true;
  public hideToken  = true;
  public paso1      = true;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {

    this.paso1 = true;
    this.buildFormPaso1();

  }

  public ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  private buildFormPaso1(): void {
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private buildFormPaso2(): void {
    const value = this.form.value;
    this.form = this.formBuilder.group({
      usuario: [value.usuario, [Validators.required]],
      password: [value.password, [Validators.required]],
      token: ['', [Validators.required]],
    });
  }

  public login(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;

      //----------------------------------------------------------------------
      //Paso 1 de login => Usuario y contraseña
      if(this.paso1) {
      //----------------------------------------------------------------------
        const credPaso1: Credential = {
          user:           value.usuario,
          password:       value.password,
          token: null,
          paso1:          true,
          paso2:          false,
          tokenJWT:       '',
          profile:        null,
          mensaje:        '',
        };

        this.authService.loginPaso1(credPaso1).subscribe(
          resp => {
            this.paso1 = false; //ahora el paso 2
            this.buildFormPaso2();
            console.log('Paso 1 validado ok', resp);
          },
          err => {
            console.log('Se ha producido un error en el paso 1 de autenticación', err)
          },
          () => console.log('Finalizó el paso 1 del login')
        );


      //----------------------------------------------------------------------
      } else { //Paso 2 de login => Usuarios, contraseña y token SMS
      //----------------------------------------------------------------------
        const credPaso2: Credential = {
          user:           value.usuario,
          password:       value.password,
          token: value.token,
          paso1:          true,
          paso2:          true,
          tokenJWT:       '',
          profile:        null,
          mensaje:        '',
        };

        this.authService.loginPaso2(credPaso2).subscribe(
          resp => {
            console.log('Paso 2 validado ok', resp);
            this.router.navigate(['/admin/viajes']);
          },
          err => {//Si hubo error, hay que volver a empezar
            this.volverAlPaso1();
            console.log('Se ha producido un error en el paso 2 de autenticación', err)
            //this.router.navigate(['/login']);
          },
          () => console.log('Finalizó el paso 2 del login')
        );

      //----------------------------------------------------------------------
      }
      //----------------------------------------------------------------------
    }
  }

  volverAlPaso1() {
    this.paso1 = true;
    this.form = null;
    this.buildFormPaso1();
  }

}
