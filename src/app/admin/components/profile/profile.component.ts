import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/core/services/user.services';
import { User } from '@app/core/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public usuario: User;
  public formuser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
      this.usuario = this.authService.getCurrentUser;
      this.buildForm();

  }

  ngOnInit(): void {
  }


  private buildForm(): any {
    this.formuser = this.formBuilder.group({
      apellido: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      habilitado : [true],
      idUsuario: ['', Validators.required],
      nombre: ['', Validators.required],
      password: [''],
      telefono: ['', Validators.required],
      timestamp: [''],
      user: ['', Validators.required],
    });

    this.formuser.patchValue(this.usuario);

  }

  public saveUser(event: Event): void
  {
    event.preventDefault();
/*     if (this.formuser.valid) { */
      let  user: User = <User>this.formuser.value;

      //Arma el objeto de transportista dentro del usuario
      user.transportista = null;
      //Si seleccionó algo y se corresponde con lo que hay en el autocomplete
      /*if( this.transpSelected != null ) {
        if( this.transportistaListCtrl.value === this.transpSelected.codigoNombre ) {
          user.transportista = this.transpSelected;
        }
      }*/

      //Arma el objeto de rol dentro del usuario
      user.usuarioRol = [];
      //Si seleccionó un rol y se corresponde con lo que hay en el autocomplete
      /*if( this.rolSelected != null ) {
        if( this.rolListCtrl.value === this.rolSelected.idDescripcion ) {
          user.usuarioRol.push( new UsuarioRol() );
          user.usuarioRol[0].idUsuarioRol =  0,
          user.usuarioRol[0].rol = this.rolSelected;
        }
      }*/

      //console.log(user);

      this.userService.update(user)
      .subscribe((user) => {
        //console.log(user);
        this.router.navigate(['/admin/users']);
        //{ relativeTo: this.route });

      });
    }
}
