import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators   } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsuarioRol } from '@app/core/models/usuarioRol';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { first } from 'rxjs/operators';

// Models
import { Transportista } from '../../../core/models/transportista';
import { User } from '../../../core/models/user';
import { Chofer } from '../../../core/models/chofer';
import { PlanificacionDetalle } from '../../../core/models/planificacion_detalle';
import { EstadoPlanificacion } from '../../../core/models/estado_planificacion';
import { Tractor } from '../../../core/models/tractor';
import { Equipo } from '../../../core/models/equipo';
import { Destino } from '../../../core/models/destino';
import { Almacen } from '../../../core/models/almacen';

// services
import { RolService } from '../../../core/services/rol.service';
import { TransportistaService } from '../../../core/services/transportista.service';
import { UserService } from '../../../core/services/user.services';
import { ChoferService } from '../../../core/services/chofer.service';
import { PlanificacionCabeceraService } from '../../../core/services/planificacion_cabecera.service';
import { PlanificacionDetalleService } from '../../../core/services/planificacion_detalle.service';
import { EstadoPlanificacionService } from '../../../core/services/estado_planificacion.service';
import { TractorService } from '../../../core/services/tractor.service';
import { EquipoService } from '../../../core/services/equipo.service';
import { DestinoService } from '../../../core/services/destino.services';
import { AlmacenService } from '../../../core/services/almacen.service';
import { AuthService } from '../../../core/services/auth.service';
import { BoundElementPropertyAst } from '@angular/compiler';

@Component({
  selector: 'app-planificacion-detail-form',
  templateUrl: './planificacion-detail-form.component.html',
  styleUrls: ['./planificacion-detail-form.component.scss']
})
export class PlanificacionDetailFormComponent implements OnInit {

  public isAddMode: boolean = false;
  public isViewMode: boolean = false;
  public isEditMode: boolean = false;
  public isReserveMode: boolean = false;
  public id: string;
  public esTransportista: boolean = false;
  public esAdmin        : boolean = false;
  public esPlanificador : boolean = false;
  public dettalles :PlanificacionDetalle[];
  public currentTransportista: Transportista;
  public formviajedetalle: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private transportistaService: TransportistaService,
    private rolService: RolService,
    private almacenService: AlmacenService,
    private choferService: ChoferService,
    private tractorService: TractorService,
    private equipoService: EquipoService,
    private EstadoPlanService: EstadoPlanificacionService,
    private destinoService: DestinoService,
    private planificacionCabeceraService: PlanificacionCabeceraService,
    private planificacionDetalleService: PlanificacionDetalleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  )
  {
    this.currentTransportista = this.authService.getTransportista;
    this.esTransportista = this.authService.esTransportista();
    this.esAdmin         = this.authService.esAdmin();
    this.esPlanificador  = this.authService.esPlanificador();
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
    this.id = params.id;
      if (this.id){
        this.getPlanificacionDetalle();
        this.formviajedetalle.disable();
      }
    })
  }

  private getPlanificacionDetalle(){
    this.planificacionDetalleService.getById(this.id)
    .pipe(first())
    .subscribe((planificaciondetalle) => {
      //console.log(planificaciondetalle);
      if (planificaciondetalle.transportista==null){
        planificaciondetalle.transportista = this.currentTransportista;
      }
      // Creo almacen en null cambiar por contructor de la clase
      var alma = new Almacen();
      alma.almacen=null;
      alma.descripcion=null;
      alma.direccion=null;
      alma.localidad=null;
      alma.provincia=null;
      alma.idDescripcion=null;

      var tran = new Transportista();
      tran.codigo=null; //este es el campo que funciona de Id
      tran.nombre=null;
      tran.direccion=null;
      tran.provincia=null;
      tran.cuit=null;
      tran.telefonoEmpresa=null;
      tran.casillaCorreo=null;
      tran.telefonoContacto=null;
      tran.localidad=null;
      tran.codigoNombre=null;
      tran.idDescripcion=null;

      if (planificaciondetalle.tractor==null){
      var track = new Tractor();
      track.descripcion=null;
      track.autorizado=null;
      track.codigo=null;
      track.almacen=alma;
      track.idTractor=null;
      track.patente=null;
      track.tipo=null;
      track.transportista=tran;
      track.vencimientoSeguro=null;
      planificaciondetalle.tractor= track;
      }

      if (planificaciondetalle.chofer==null){
      // Creo Chofer en null cambiar por contructor de la clase
      var chof = new Chofer();
      chof.apellido=null;
      chof.autorizado=null;
      chof.codigo=null;
      chof.almacen=alma;
      chof.dni=null;
      chof.idChofer=null;
      chof.licencia=null;
      chof.transportista=tran;
      chof.telefonoContacto=null;
      planificaciondetalle.chofer= chof;
      }


      if (planificaciondetalle.equipo==null){
      // Creo Chofer en null cambiar por contructor de la clase
      var equip = new Equipo();
      equip.autorizado=null;
      equip.codigo=null;
      equip.almacen=alma;
      equip.descripcion=null;
      equip.idEquipo=null;
      equip.patente=null;
      equip.transportista=tran;
      equip.vencimientoSeguro=null;
      equip.idDescripcion=null;

      planificaciondetalle.equipo= equip;
      }

      this.formviajedetalle.patchValue(planificaciondetalle);
      //console.log(this.formviajedetalle);
    })
  }


private buildForm(): any {
      this.formviajedetalle= this.formBuilder.group({
          almacen: this.formBuilder.group({
          almacen:[],
          descripcion:[],
          direccion:[],
          localidad:[],
          provincia:[],
          idDescripcion:[]
        }),
        cabeceraPlanificacion: [''],
          chofer: this.formBuilder.group({
          apellido:[],
          autorizado:[],
          codigo:[],
          dni: [],
          idChofer: [],
          licencia: [],
          nombre: [],
          telefonoContacto: [],
          almacen: this.formBuilder.group({
            almacen:[],
            descripcion:[],
            direccion:[],
            localidad:[],
            provincia:[],
          }),
          transportista: this.formBuilder.group({
            casillaCorreo:[],
            codigo:[],
            direccion:[],
            codigoNombre:[],
            cuit:[],
            localidad:[],
            nombre:[],
            provincia:[],
            telefonoContacto:[],
            telefonoEmpresa:[],
          }),
        }),
          equipo: this.formBuilder.group({
          almacen: this.formBuilder.group({
            almacen:[],
            descripcion:[],
            direccion:[],
            localidad:[],
            provincia:[],
            idDescripcion:[]
          }),
          autorizado:[],
          codigo:[],
          descripcion:[],
          idEquipo:[],
          patente:[],
          tipo:[],
          transportista: this.formBuilder.group({
            casillaCorreo:[],
            codigo:[],
            direccion:[],
            codigoNombre:[],
            cuit:[],
            localidad:[],
            nombre:[],
            provincia:[],
            telefonoContacto:[],
            telefonoEmpresa:[],
          }),
          vencimientoSeguro:[],
          idDescripcion:[],
        }),
          estado: this.formBuilder.group({
          codigo:[],
          descripcion:[]
        }),
        fechaHoraCreacion: [''],
        idDetallePlanificacion:[],
        idMuelle:[],
        notificacion:[],
        observaciones:[],
        timestamp: [''],
          tractor: this.formBuilder.group({
          almacen: this.formBuilder.group({
            almacen:[],
            descripcion:[],
            direccion:[],
            localidad:[],
            provincia:[],
            idDescripcion:[]
          }),
          autorizado:[],
          codigo:[],
          descripcion:[],
          idTractor:[],
          patente:[],
          tipo:[],
          transportista: this.formBuilder.group({
            casillaCorreo:[],
            codigo:[],
            direccion:[],
            codigoNombre:[],
            cuit:[],
            localidad:[],
            nombre:[],
            provincia:[],
            telefonoContacto:[],
            telefonoEmpresa:[],
          }),
          vencimientoSeguro:[],
          idDescripcion:[],
        }),
          transportista: this.formBuilder.group({
          casillaCorreo:[],
          codigo:[],
          direccion:[],
          codigoNombre:[],
          cuit:[],
          localidad:[],
          nombre:[],
          provincia:[],
          telefonoContacto:[],
          telefonoEmpresa:[],
        }),
        usuario: ['']
      });
    }
}
