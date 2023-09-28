import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators   } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsuarioRol } from '@app/core/models/usuarioRol';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { first } from 'rxjs/operators';

import { MyValidatos } from '../../../utils/validatos';

// Models
import { Rol } from '../../../core/models/rol';
import { Transportista } from '../../../core/models/transportista';
import { User } from '../../../core/models/user';
import { Chofer } from '../../../core/models/chofer';
import { PlanificacionCabecera } from '../../../core/models/planificacion_cabecera';
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
import { EstadoPlanificacionService } from '../../../core/services/estado_planificacion.service';
import { TractorService } from '../../../core/services/tractor.service';
import { EquipoService } from '../../../core/services/equipo.service';
import { DestinoService } from '../../../core/services/destino.services';
import { AlmacenService } from '../../../core/services/almacen.service';
import { AuthService } from '../../../core/services/auth.service';
import { BoundElementPropertyAst } from '@angular/compiler';


@Component({
  selector: 'app-planificacion-form',
  styleUrls: ['./planificacion-form.component.scss'],
  templateUrl: './planificacion-form.component.html',
})
export class PlanificacionFormComponent implements OnInit {
  public isAddMode: boolean = false;
  public isViewMode: boolean = false;
  public isEditMode: boolean = false;
  public isReserveMode: boolean = false;
  public formviaje: FormGroup;
  public id: string;
  public esTransportista: boolean = false;
  public esAdmin        : boolean = false;
  public esPlanificador : boolean = false;
  public dettalles :PlanificacionDetalle[];
  public hayDetalles: boolean = false;
  public estadoPendiente:  EstadoPlanificacion;
  public almacenpordefecto: Almacen;

  //  Chofer por transportista
  almacenListCtrl = new FormControl();
  almacenes:         Almacen[]=[];
  filteredAlmacen:  Observable<Almacen[]>;
  almacenSelected:         Almacen;
  almacenesDes: string[];

  //  Chofer por transportista
  choferListCtrl = new FormControl();
  choferes:         Chofer[]=[];
  filteredChofer:  Observable<Chofer[]>;
  choferSelected:         Chofer;

  //  tractor por transportista
  tractorListCtrl = new FormControl();
  tractores:         Tractor[]=[];
  filteredTractor:  Observable<Tractor[]>;
  tractorSelected:         Tractor;

  //  tractor por transportista
  equipoListCtrl = new FormControl();
  equipos:         Equipo[]=[];
  filteredEquipo:  Observable<Equipo[]>;
  equipoSelected:         Equipo;
  equipoDes: string[];

  //  destino
  destinoListCtrl = new FormControl();
  destinos:         Destino[]=[];
  filteredDestino:  Observable<Destino[]>;
  destinoSelected:         Destino;
  destinoDes:string[];

  estados:         EstadoPlanificacion[]=[];


  currentTransportista: Transportista;
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
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.currentTransportista = this.authService.getTransportista;
      this.esTransportista = this.authService.esTransportista();
      this.esAdmin         = this.authService.esAdmin();
      this.esPlanificador  = this.authService.esPlanificador();
      this.buildForm();
      this.EstadoPlanService.getById('00').subscribe( (resp) => this.estadoPendiente = resp);
      this.almacenService.getById('001').subscribe( (resp) => this.almacenpordefecto = resp);

    }


  public validation_msgs = {
    'equipoListCtrl': [
      { type: 'invalidAutocompleteObject', message: 'Contact name not recognized. Click one of the autocomplete options.' },
      { type: 'required', message: 'Contact is required.' }
    ],
    'almacenListCtrl': [
      { type: 'invalidAutocompleteString', message: 'Phone label not recognized. Click one of the autocomplete options.' },
      { type: 'required', message: 'Phone label is required.' }
    ]
  }

  public ngOnInit(): void {
    //Si tengo un id asumo que es modificar
/*     this.id = this.route.snapshot.params.id; */
    this.formviaje.valueChanges.subscribe(
      value => {
        //console.log('CAMBIO ' + value);
      });
    this.getEstados();
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      // Modifica / visualiza / Reserva una planificacion existente (Datos necesarios (Almacen para Tractor/Chofer - Transportista para Equipo/Tractor/Chofer )
      if (this.id){
        this.isAddMode  =  false;
        this.getPlanificacionCabecera();
        if(this.router.url.indexOf('viajes/view')>0) {
          this.isViewMode = true;
          this.formviaje.disable();
        }
        if(this.router.url.indexOf('viajes/edit')>0) {
          this.isEditMode = true;
        }
        if(this.router.url.indexOf('viajes/reserve')>0) {
          this.isReserveMode = true;
        }
      }
      // Crea una Planificacion sin datos requeridos, se debe validar en la creacion que se agregue el Destino, Almacen clave para Tractor/Chofer
      else{
        this.isAddMode=true;
        this.addPlanificacionCabecera();
   }
      this.setViajesValidators();
      // Asigna validadores a los campos del formularios
    })
    // Evento para el filtro de almacen
    this.filteredAlmacen = this.almacenListCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterAlmacen(value))
    );
    // Evento para el filtro de estado planificacion
    this.filteredDestino = this.destinoListCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterDestino(value))
    );

    this.filteredChofer = this.choferListCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterChofer(value))
    );

     this.filteredEquipo = this.equipoListCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterEquipo(value))
    );

    this.filteredTractor = this.tractorListCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filtertractor(value))
    );
  }

  private buildForm(): any {
    this.formviaje= this.formBuilder.group({
      idCabeceraPlanificacion: [''],
      numeroPlanificacion: [''],
      fechaCarga : [],
      horaCarga: [''],
      tipoCarga: [''],
      cancelable: [''],
      observacion: [''],
      timestamp: [''],
      user: ['', ],
      almacen: this.formBuilder.group({
        almacen:[],
        descripcion:[],
        direccion:[],
        localidad:[],
        provincia:[],
        idDescripcion:[]
      }),
      destino: this.formBuilder.group({
        destino:[],
        nombre:[],
        direccion:[],
        localidad:[],
        provincia:[],
        casillaCorreo: [],
        telefonoContacto: [],
        duracionViaje:[],
        diasAnticipacionTurno:[],
        idDescripcion:[]
      }),
      estado: this.formBuilder.group({
        codigo:[],
        descripcion:[]
      }),
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
/*       equipoListCtrl:[],
      almacenListCtrl:[],
      destinoListCtrl:[], */
      cantidad:[],
    });
  }


  get almacenListCtrlfield(){
    return this.formviaje.get('almacenListCtrl');
  }

  get cantidadfield(){
    return this.formviaje.get('cantidad');
  }

  get equipoctrlfield(){
    return this.formviaje.get('equipoListCtrl');
  }

  get almacenctrlfield(){
    return this.formviaje.get('almacenListCtrl');
  }

  get destinoctrlfield(){
    return this.formviaje.get('destinoListCtrl');
  }

  get tractorfield(){
    return this.formviaje.get('tractor');
  }

  get equipofield(){
    return this.formviaje.get('equipo');
  }

  get destinofield(){
    return this.formviaje.get('destino');
  }
  get destinodestinofield(){
    return this.formviaje.get('destino').get('destino');
  }
  get destinonombrefield(){
    return this.formviaje.get('destino').get('nombre');
  }
  get estadofield(){
    return this.formviaje.get('estado');
  }
  get estadocodigofield(){
    return this.formviaje.get('estado').get('codigo');
  }
  get estadodescripcionfield(){
    return this.formviaje.get('estado').get('descripcion');
  }
  get choferfield(){
    return this.formviaje.get('chofer');
  }
  get choferalmacenfield(){
    return this.formviaje.get('chofer').get('almacen');
  }
  get choferalmacenalmacenfield(){
    return this.formviaje.get('chofer').get('almacen').get('almacen');
  }
  get choferalmacendescripcionfield(){
    return this.formviaje.get('chofer').get('almacen').get('descripcion');
  }
  get choferalmacendireccionfield(){
    return this.formviaje.get('chofer').get('almacen').get('direccion');
  }
  get choferalmacenlocalidadfield(){
    return this.formviaje.get('chofer').get('almacen').get('localidad');
  }
  get choferalmacenprovinciafield(){
    return this.formviaje.get('chofer').get('almacen').get('provincia');
  }
  get choferapellidofield(){
    return this.formviaje.get('chofer').get('apellido');
  }
  get choferautorizadofield(){
    return this.formviaje.get('chofer').get('autorizado');
  }
  get chofercodigofield(){
    return this.formviaje.get('chofer').get('codigo');
  }
  get choferdnifield(){
    return this.formviaje.get('chofer').get('dni');
  }
  get choferidChoferfield(){
    return this.formviaje.get('chofer').get('idChofer');
  }
  get choferlicenciafield(){
    return this.formviaje.get('chofer').get('licencia');
  }
  get chofernombrefield(){
    return this.formviaje.get('chofer').get('nombre');
  }
  get chofertelefonoContactofield(){
    return this.formviaje.get('chofer').get('telefonoContacto');
  }
  get almacendfield(){
    return this.formviaje.get('almacen');
  }
  get almacendalmacenfield(){
    return this.formviaje.get('almacen').get('almacen');
  }
  get almacenddescripcionfield(){
    return this.formviaje.get('almacen').get('descripcion');
  }
  get almacenddireccionfield(){
    return this.formviaje.get('almacen').get('direccion');
  }
  get almacendlocalidadfield(){
    return this.formviaje.get('almacen').get('localidad');
  }
  get almacendprovinciafield(){
    return this.formviaje.get('almacen').get('provincia');
  }
  get idCabeceraPlanificacionfield(){
    return this.formviaje.get('idCabeceraPlanificacion');
  }
  get numeroPlanificacionfield(){
    return this.formviaje.get('numeroPlanificacion');
  }
  get fechaCargafield(){
    return this.formviaje.get('fechaCarga');
  }
  get horaCargafield(){
    return this.formviaje.get('fechaCarga');
  }
  get tipoCargafield(){
    return this.formviaje.get('fechaCarga');
  }
  get cancelablefield(){
    return this.formviaje.get('cancelable');
  }
  get observacionfield(){
    return this.formviaje.get('observacion');
  }
  get timestampfield(){
    return this.formviaje.get('timestamp');
  }
  get userfield(){
    return this.formviaje.get('userfield');
  }

   public reservar(){
     this.getEstado('10');
   }

   public verDetalle(id: string){
    //console.log(this.dettalles);

/*     this.detallesPlanificacion.emit(this.dettalles) */
    this.router.navigate(['viajesdetalle/', {id}]);
   }

  public save(event: Event): void
  {
    event.preventDefault();

    // Valida que la carga del formulario sea valida
    if (this.formviaje.valid && this.equipoListCtrl.valid && this.almacenListCtrl.valid && this.destinoListCtrl.valid ){
        if (this.isReserveMode){
            this.reservar();
        }

        let  planificacion: PlanificacionCabecera = <PlanificacionCabecera>this.formviaje.value;
        planificacion.equipo = null;
        planificacion.chofer = null;
        planificacion.tractor= null;

        if( this.equipoSelected != null ) {
            planificacion.equipo = this.equipoSelected;
        }
        else{
            planificacion.equipo = this.equipoSelected;
        }

        if( this.choferSelected != null ) {
                  planificacion.chofer = this.choferSelected;
        }
        else{
            planificacion.chofer = this.choferSelected;
        }

        if( this.tractorSelected != null ) {
                  planificacion.tractor = this.tractorSelected;
        }
        else{
            planificacion.tractor = this.tractorSelected;
        }

        //planificacion.get('transportista')=
        if (this.isReserveMode || this.isEditMode){
          this.planificacionCabeceraService.update(planificacion).subscribe(
            (planificacion) => {
            //console.log(planificacion);
            this.router.navigate(['/admin/viajes'],
            { relativeTo: this.route });
          });
        }
        if (this.isAddMode){
          let  planificacion: PlanificacionCabecera = new PlanificacionCabecera();
          planificacion =  <PlanificacionCabecera>this.formviaje.value;
          planificacion.almacen = this.almacenSelected;
          planificacion.destino = this.destinoSelected;
          planificacion.cancelable=true;
          planificacion.chofer=null;
          planificacion.equipo=null;
          planificacion.tipoCarga='SEC';
          planificacion.tractor=null;
          planificacion.transportista=null;
          //el formato de la fecha YYYYMMDD
          let fechaalta = this.fechaCargafield.value;
          fechaalta = fechaalta.replace(/-/g,"");
          planificacion.fechaCarga = fechaalta;
          planificacion.horaCarga = '10:00';
          planificacion.estado = this.estadoPendiente;
          planificacion.usuarioCreador=this.authService.getCurrentUser;
          planificacion.timestamp=null;
          planificacion.idCabeceraPlanificacion=null;
          planificacion.numeroPlanificacion=null;

          var cant = this.cantidadfield.value;
          for(var num=1;num<=cant;num++) {
            if (num === cant) {
              this.planificacionCabeceraService.create(planificacion).subscribe(
                (planificacion) => {
                //console.log(planificacion);
                this.router.navigate(['/admin/viajes'],
                { relativeTo: this.route });
              });
            }else
            {
              this.planificacionCabeceraService.create(planificacion).subscribe(
                (planificacion) => {
                //console.log(planificacion);
              });
            }
         }
        }
    }
    else{
      this.formviaje.markAllAsTouched();
      this.equipoListCtrl.markAllAsTouched();
      this.almacenListCtrl.markAllAsTouched();
      this.destinoListCtrl.markAllAsTouched();
    }
    }

  // Filtro like lista almacen por nombre
  private _filterAlmacen(value: string): Almacen[] {
    const filterValue = value.toLowerCase();
    return this.almacenes.filter((option) => option.idDescripcion.toLowerCase().includes(filterValue));
  }

  // Evento cuando se elije un valor de la lista
  getAlmacen( almacen ){
    this.almacenSelected = this.almacenes.find(x => x.idDescripcion===almacen);
  }

  clearalmacen() {
    this.almacenListCtrl.setValue('');
    this.almacenSelected = null;
  }

    // Evento cuando se elije un valor de la lista
    getEstado( estado ){
/*       this.estadoSelected = this.estados.find(x => x.codigo===estado); */
      this.estadofield.setValue(this.estados.find(x => x.codigo===estado));
    }

    // Filtro like lista destino por nombre
    private _filterDestino(value: string): Destino[] {
      const filterValue = value.toLowerCase();
      return this.destinos.filter((option) => option.idDescripcion.toLowerCase().includes(filterValue));
    }

    // Evento cuando se elije un valor de la lista
    getDestino( destino ){
      this.destinoSelected = this.destinos.find(x => x.idDescripcion===destino);
    }

    clearDestino() {
      this.destinoListCtrl.setValue('');
      this.destinoSelected = null;
    }

    // Filtro like lista equipo por nombre
    private _filterEquipo(value: string): Equipo[] {
      const filterValue = value.toLowerCase();
      return this.equipos.filter((option) => option.idDescripcion.toLowerCase().includes(filterValue));
    }

    // Evento cuando se elije un valor de la lista
    getEquipo( equipo ){
      this.equipoSelected = this.equipos.find(x => x.idDescripcion===equipo);
    }

    clearEquipo() {
      this.equipoListCtrl.setValue('');
      this.equipoSelected = null;
    }

    // Filtro like lista chofer por nombre
    private _filterChofer(value: string): Chofer[] {
      const filterValue = value.toLowerCase();
      return this.choferes.filter((option) => option.idDescripcion.toLowerCase().includes(filterValue));
    }

    // Evento cuando se elije un valor de la lista
    getChofer( chofer ){
      this.choferSelected = this.choferes.find((x) => x.idDescripcion === chofer);
    }

    clearChofer() {
      this.choferListCtrl.setValue('');
      this.choferSelected = null;
    }

    // Filtro like lista tractor por nombre
    private _filtertractor(value: string): Tractor[] {
      const filterValue = value.toLowerCase();
      return this.tractores.filter((option) => option.idDescripcion.toLowerCase().includes(filterValue));
    }

    // Evento cuando se elije un valor de la lista
    getTractor( tractor ){
      this.tractorSelected = this.tractores.find((x) => x.idDescripcion === tractor);
    }

    clearTractor() {
      this.tractorListCtrl.setValue('');
      this.tractorSelected = null;
    }

    private addPlanificacionCabecera(){
              // Creo almacen en null cambiar por contructor de la clase
              var alma = new Almacen();
              alma.almacen=null;
              alma.descripcion=null;
              alma.direccion=null;
              alma.localidad=null;
              alma.provincia=null;
              alma.idDescripcion=null;

              let planificacion = new PlanificacionDetalle();
              this.formviaje.patchValue(planificacion);
              //console.log(this.formviaje);
              this.getAlmacenes();
              this.getDestinos();
    }

    private getPlanificacionCabecera(){
      this.planificacionCabeceraService.getById(this.id)
      .pipe(first())
      .subscribe((planificacion) => {
        //console.log(planificacion);
        if (planificacion.transportista==null){
          planificacion.transportista = this.currentTransportista;
        }
        if (planificacion.colDetallePlanificacionViajes!=null){
          this.dettalles = planificacion.colDetallePlanificacionViajes;
          if (this.dettalles.length > 0)
          {
            this.hayDetalles = true;
          }else
          {
            this.hayDetalles = false;
          }
/*           this.detallesPlanificacion = planificacion.colDetallePlanificacionViajes; */
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

        if (planificacion.tractor==null){
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

        /* planificacion.tractor = new Tractor(); */
        planificacion.tractor= track;
        }

        if (planificacion.chofer==null){
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

        planificacion.chofer= chof;
        }


        if (planificacion.equipo==null){
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

        planificacion.equipo= equip;
        }

        this.formviaje.patchValue(planificacion);
        //console.log(this.formviaje);
        this.getChoferesTransportistas();
        this.getEquipoTransportistas();
        this.getTractorTransportistas();

      // Seteo equipo si no es null
        if (planificacion.equipo.idEquipo!=null){
          this.equipoListCtrl.setValue(planificacion.equipo.idDescripcion);
          this.equipoSelected = planificacion.equipo;
        }

        // Seteo tractor si no es null
        if (planificacion.tractor.idTractor!=null){
          this.tractorListCtrl.setValue(planificacion.tractor.idDescripcion);
          this.tractorSelected = planificacion.tractor;
        }

        // Seteo tractor si no es null
        if (planificacion.chofer.idChofer!=null ){
          this.choferListCtrl.setValue(planificacion.chofer.idDescripcion);
          this.choferSelected = planificacion.chofer;
        }

        // Seteo tractor si no es null
        if (planificacion.destino!=null){
          this.destinoListCtrl.setValue(planificacion.destino.idDescripcion);
          this.destinoSelected = planificacion.destino;
        }

      })
    }

    getChoferesTransportistas(){
      this.choferService.getByTransportista( this.currentTransportista.codigo, this.almacendalmacenfield.value ).subscribe((choferData) => {
        this.choferes = choferData;
      });
    }

    getEquipoTransportistas(){
      this.equipoService.getByTransportista( this.id,this.currentTransportista.codigo ).subscribe((equipoData) => {
        this.equipos = equipoData;
        this.equipoDes = equipoData.idDescripcion;
      });
    }

    getEquiposTransportistasdes():any{
      this.equipoService.getByTransportista( this.id,this.currentTransportista.codigo ).subscribe((equipoData) => {
        this.equipoDes = equipoData.idDescripcion;
        return this.equipoDes;
      });
    }

    getTractorTransportistas(){
      this.tractorService.getByTransportista( this.currentTransportista.codigo, this.almacendalmacenfield.value ).subscribe((tractorData) => {
        this.tractores = tractorData;
      });
    }

    getAlmacenes (){
      this.almacenService.getAll().subscribe((almacenData) => {
        this.almacenes = almacenData;
        this.almacenesDes = almacenData.idDescripcion;
      });
    }

    getDestinos(){
      this.destinoService.getAll().subscribe((destinoData) => {
        this.destinos = destinoData;
        this.destinoDes = destinoData;
      });
    }

    getEstados(){
      this.EstadoPlanService.getAll().subscribe((estadoData) => {
        this.estados = estadoData;
      });
    }

    setViajesValidators() {
       // Aplica validacion solo para cuando no es viewmode
      if (!this.isViewMode){
        // Valores requeridos para la creacion
        if (this.isAddMode){
          this.fechaCargafield.setValidators([Validators.required]);
          this.cantidadfield.setValidators([Validators.required,Validators.min(1)]);
          this.almacenListCtrl.setValidators([Validators.required]);
          this.destinoListCtrl.setValidators([Validators.required]);

        }
        //Valores requeridos para la modificacion
        else{
/*           this.equipoListCtrl.setValidators([Validators.required, MyValidatos.autocompleteStringValidator(this.equipoListCtrl.value)]); */
          this.equipoListCtrl.setValidators([Validators.required]);
        }
      }
    }

    public displayAlmacentFn(almacen?: Almacen): string | undefined {
      return almacen ? almacen.idDescripcion : undefined
    }
}
