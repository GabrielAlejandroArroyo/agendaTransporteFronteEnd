import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators   } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioRol } from '@app/core/models/usuarioRol';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { first } from 'rxjs/operators';

// Models
import { Rol } from '@app/core/models/rol';
import { Transportista } from '@app/core/models/transportista';
import { User } from '@app/core/models/user';

// services
import { RolService } from '@app/core/services/rol.service';
import { TransportistaService } from '@app/core/services/transportista.service';
import { UserService } from '@app/core/services/user.services';

@Component({
  selector: 'app-users-from',
  styleUrls: ['./user-form.component.scss'],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  public isAddMode: boolean;
  public isViewMode: boolean;
  public formuser: FormGroup;
  public id: string;

  //Autocomplete de transportistas
  transportistaListCtrl = new FormControl();
  transportistas:         Transportista[]=[];
  filteredTransportista:  Observable<Transportista[]>;
  transpSelected:         Transportista;

  //Autocomplete de roles
  rolListCtrl = new FormControl();
  roles:        Rol[]=[];
  filteredRol:  Observable<Rol[]>;
  rolSelected:  Rol;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private transportistaService: TransportistaService,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.buildForm();
  }

  public ngOnInit(): void {
    //Si tengo un id asumo que es modificar
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    //Si la ruta es 'view' no tiene permisos para modificar (solo ver)
    if(this.router.url.indexOf('/users/view')>0) {
      this.isViewMode = true;
      this.formuser.disable();
    }

    //Cargo los transportistas
    this.transportistaService.getAll().subscribe((transportistaData) => {
      this.transportistas = transportistaData;
    });

    //Cargo los roles
    this.rolService.getAll().subscribe((rolData) => {
      this.roles = rolData;
    });

    //Evento para el filtro de transportistas
    this.filteredTransportista = this.transportistaListCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterTransportista(value))
    );

    //Evento para el filtro de roles
    this.filteredRol = this.rolListCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterRol(value))
    );

    //Carga los datos del usuario
    if (!this.isAddMode) {
      this.userService.getById(this.id)
          .pipe(first())
          .subscribe((usu) => {

            this.formuser.patchValue(usu);

            //Cargamos el transportista asignado al usuario
            //Valor inicial para transportista
            if(usu.transportista != null) {
              this.transportistaListCtrl.setValue(usu.transportista.codigoNombre);
              this.transpSelected = usu.transportista;
            }

            //Cargamos el rol asignado al usuario
            //Valor inicial para rol
            if(usu.usuarioRol != null ) {
              if(usu.usuarioRol[0] != null) {
                if(usu.usuarioRol[0].rol != null) {
                  this.rolListCtrl.setValue(usu.usuarioRol[0].rol.idDescripcion);
                  this.rolSelected = usu.usuarioRol[0].rol;
                }
              }
            }

         });
    }
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
  }

  public saveUser(event: Event): void
  {
    event.preventDefault();
/*     if (this.formuser.valid) { */
      let  user: User = <User>this.formuser.value;

      //Arma el objeto de transportista dentro del usuario
      user.transportista = null;
      //Si seleccionó algo y se corresponde con lo que hay en el autocomplete
      if( this.transpSelected != null ) {
        if( this.transportistaListCtrl.value === this.transpSelected.codigoNombre ) {
          user.transportista = this.transpSelected;
        }
      }

      //Arma el objeto de rol dentro del usuario
      user.usuarioRol = [];
      //Si seleccionó un rol y se corresponde con lo que hay en el autocomplete
      if( this.rolSelected != null ) {
        if( this.rolListCtrl.value === this.rolSelected.idDescripcion ) {
          user.usuarioRol.push( new UsuarioRol() );
          user.usuarioRol[0].idUsuarioRol =  0,
          user.usuarioRol[0].rol = this.rolSelected;
        }
      }

      //console.log(user);

      if (this.isAddMode === true) {
          this.userService.create(user)
          .subscribe(
            (newUser) => {
            //console.log(newUser);
            this.router.navigate(['/admin/users'],
            { relativeTo: this.route });
          });
      } else {
          this.userService.update(user)
          .subscribe((user) => {
            //console.log(user);
            this.router.navigate(['/admin/users'],
            { relativeTo: this.route });
          });
      }
/*     } */
  }

  // Filtro like lista transportista por nombre
  private _filterTransportista(value: string): Transportista[] {
    const filterValue = value.toLowerCase();
    return this.transportistas.filter((option) => option.codigoNombre.toLowerCase().includes(filterValue));
  }

  //Evento cuando se elije un valor de la lista
  getTransportista( transportista ){
    this.transpSelected = this.transportistas.find(x => x.codigoNombre===transportista);
  }

  clearTransportista() {
    this.transportistaListCtrl.setValue('');
    this.transpSelected = null;
  }


  //Filtro like lista rol por nombre
  private _filterRol(value: string): Rol[] {
    const filterValue = value.toLowerCase();
    return this.roles.filter((option) => option.idDescripcion.toLowerCase().includes(filterValue));
  }

  //Evento cuando se elije un valor de la lista
  getRol( rol ){
    this.rolSelected = this.roles.find(x => x.idDescripcion===rol);
  }

  clearRol() {
    this.rolListCtrl.setValue('');
    this.rolSelected = null;
  }


}
