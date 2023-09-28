import { Component , Input, OnInit, ViewChild   } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/core/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComentarioComponent } from '@app/material/components/dialog-comentario/dialog-comentario.component';
import { DialogSiNoComponent } from '@app/material/components/dialog-sino/dialog-sino.component';

// Core
import { PlanificacionCabecera } from '@app/core/models/planificacion_cabecera';
import { PlanificacionCabeceraGrilla } from '@app/core/models/planificacion_cabecera_grilla';
import { PlanificacionCabeceraService } from '@app/core/services/planificacion_cabecera.service';
import { PlanificacionCabeceraLazyGrilla } from '@app/core/models/planificacion_cabecera_lazy_grilla';
import { PlanificacionCabeceraLazyService } from '@app/core/services/planificacion_cabecera_lazy.service';

import { EstadoPlanificacion } from '@app/core/models/estado_planificacion';
import { PlanificacionCabeceraLazy } from '@app/core/models/planificacion_cabecera_lazy';
import { EstadoPlanificacionService } from '@app/core/services/estado_planificacion.service';


import { first } from 'rxjs/operators';
import {SpinnerService} from '../../../core/services/spinner.service';
import { NgxLoadingModule } from 'ngx-loading';


@Component({
  selector: 'app-planificacion-list',
  styleUrls: ['./planificacion-list.component.scss'],
  templateUrl: './planificacion-list.component.html',
})
export class PlanificacionListComponent implements OnInit {

  // Configuración de la tabla
/*   public viajesData:       MatTableDataSource<PlanificacionCabeceraGrilla>; */
  public viajesData:       MatTableDataSource<PlanificacionCabeceraLazyGrilla>;
  public esPendientes:     boolean = false;
  public esReservados:     boolean = false;
  public esIngresado:      boolean = false;
  public displayedColumns: string[] = ['id', 'numero', 'fechaCargaStr', 'horaCarga', 'origen', 'destino', 'estado', 'action'];
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort)      public sort: MatSort;

  // Perfiles de usuario
  public esTransportista: boolean = false;
  public esAdmin        : boolean = false;
  public esPlanificador : boolean = false;


  // Configuración del contenido de la tabla
  @Input() public noRowLabel: string = 'No hay viajes';
  @Input() public tipo:       string;// = 'PENDIENTES';

  // Popup para la cancelación
  private dialogConfig = new MatDialogConfig();

  // Estados de cancelaciòn
  private estadoCancelado: EstadoPlanificacion;
  private estadoPendiente: EstadoPlanificacion;
  public viajeCancelado: PlanificacionCabecera;

  constructor(
    private viajesService:  PlanificacionCabeceraService,
    private viajesServiceLazy : PlanificacionCabeceraLazyService,
    private authService:    AuthService,
    public dialog:          MatDialog,
    private router:         Router,
    private estadoService: EstadoPlanificacionService,
    private spinner: SpinnerService
  ) {
    //Roles
    this.esTransportista = this.authService.esTransportista();
    this.esAdmin         = this.authService.esAdmin();
    this.esPlanificador  = this.authService.esPlanificador();

    //Configuraciòn del popup
    this.dialogConfig.disableClose  = false;
    this.dialogConfig.autoFocus     = true;
    this.dialogConfig.width         = '450px';
    // this.dialogConfig.panelClass = "dialog-toolbar";

    //Estados de cancelaciòn
    this.estadoService.getById('85').subscribe( (resp) => this.estadoCancelado = resp);
    this.estadoService.getById('00').subscribe( (resp) => this.estadoPendiente = resp);

  }

  public ngOnInit(): void {
    this.spinner.show();
    if(this.tipo === 'PENDIENTES') {
      this.fetchPendientes();

    } else if(this.tipo === 'RESERVADOS') {
      this.fetchReservados();

    } else if(this.tipo === 'INGRESADOS') {
      this.fetchIngresados();

    } else if(this.tipo === 'TODOS') { //Perfil de la anónima
      this.fetchAll();
    }


  }

  public fetchPendientes(): void {
    this.viajesServiceLazy.getPendientesByTransportista(this.authService.getTransportista)
    .subscribe((viajes) => this.setDatasource(viajes) );

    this.esPendientes = true;
    this.esReservados = false;
    this.esIngresado = false;
  }

  public fetchReservados(): void {
    this.viajesServiceLazy.getAsignadosByTransportista(this.authService.getTransportista)
    .subscribe((viajes) => this.setDatasource(viajes) );

    this.esPendientes = false;
    this.esReservados = true;
    this.esIngresado = false;
  }

  public fetchIngresados(): void {
    this.viajesServiceLazy.getAsignadosByTransportista(this.authService.getTransportista)
    .subscribe((viajes) => this.setDatasource(viajes) );
    this.esPendientes = false;
    this.esReservados = false;
    this.esIngresado = true;
  }

  public fetchAll(): void {
    this.viajesServiceLazy.getVigentesAll()
    .subscribe((viajes) => this.setDatasource(viajes) );
  }

    private setDatasource(viajes: PlanificacionCabeceraLazy[]) {

    //console.log(viajes);
    let viajesGrilla: PlanificacionCabeceraGrilla[] = [];
    let viajesGrillaLazy: PlanificacionCabeceraLazyGrilla[] = [];

    viajes.forEach(function (viaje) {
      let v = new PlanificacionCabeceraLazyGrilla(viaje);
      viajesGrillaLazy.push(v);
    });

    this.viajesData = new MatTableDataSource(viajesGrillaLazy);
    //this.viajesData.filterPredicate = this.customFilterPredicate();
    this.viajesData.sort = this.sort;
    this.viajesData.paginator = this.paginator;
  }


  //-----------------------------------------------------------
  //ACCIONES DE LA GRILLA
  //-----------------------------------------------------------
  protected crear(): void {
    this.router.navigate(['viajes/create/']);
  }

  // Se abre el formulario para completar los datos de la reserva
  protected reservar(viaje: PlanificacionCabecera): void {
    this.router.navigate(['viajes/reserve/', {id: viaje.idCabeceraPlanificacion}]);
  }

  // Se abre el formulario para modificar los datos de la reserva
  protected modificarReserva(viaje: PlanificacionCabecera): void {
    this.router.navigate(['viajes/edit/', {id: viaje.idCabeceraPlanificacion}]);
  }

  // Se abre el formulario de solo consulta
  protected ver(viaje: PlanificacionCabecera): void {
    this.router.navigate(['viajes/view/', {id: viaje.idCabeceraPlanificacion}]);
  }

  // Se cancela la planificaciòn (Solo perfil de La Anònima)
  protected cancelarPlanificacion(viaje: PlanificacionCabecera): void {

    this.dialogConfig.data = {
      mensaje: 'Está seguro que desea cancelar la planificación?',
      label: '',
      comentario: '',
    };
    // Hago el get por el id de cabecera
    this.getPlanificacionCabeceraCancelaciones(viaje.idCabeceraPlanificacion.toString(), this.estadoCancelado);
  }

  //El transportista cancela la reserva, debe ingresar un comentario
  protected cancelarReserva(viaje: PlanificacionCabecera): void {

    this.dialogConfig.data = {
      mensaje: 'Está seguro que desea cancelar la reserva?',
      label: 'Por favor escriba el motivo:',
      comentario: '',
    };
    this.getPlanificacionCabeceraPendiente(viaje.idCabeceraPlanificacion.toString(), this.estadoPendiente);
  }

  //-----------------------------------------------------------
  //POPUPS
  //-----------------------------------------------------------
  // Abre la ventana de comentario y actualiza el viaje con el estado del paràmetro
  private updateViajeComentario(planif: PlanificacionCabecera, estado: EstadoPlanificacion) {

    const dialogRef = this.dialog.open(DialogComentarioComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      // Ese es el comentario que escribiò el usuario
      let coment = result;

      if(coment != null && coment !== ''){

        planif.estado              = estado;
        planif.usuarioModificador  = this.authService.getCurrentUser;
        planif.observacion         = coment;
        planif.transportista       = null;
        planif.equipo              = null;
        planif.chofer              = null;
        planif.tractor             = null;

        this.viajesService.update(planif).subscribe(
          resp => {
            //console.log('Reserva [' + planif.idCabeceraPlanificacion + '] cancelada', resp);
            this.ngOnInit();
          },
          err => {
            console.log('Se ha producido un error cancelando la reserva', err)
          },
          () => console.log('Finalizó la actualización de la reserva')
        );
      }
    });
  }



  // Abre la ventana de confirmaciòn y actualiza el viaje con el estado del paràmetro
  private updateViajeConfirmacion(planif: PlanificacionCabecera, estado: EstadoPlanificacion) {

    const dialogRef = this.dialog.open(DialogSiNoComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      //Si puso ok, devuelve true
      if(result){
        planif.estado             = estado;
        planif.usuarioModificador = this.authService.getCurrentUser;
        planif.observacion        = "";
        planif.transportista      = null;
        planif.equipo             = null;
        planif.chofer             = null;
        planif.tractor            = null;

        this.viajesService.update(planif).subscribe(
          resp => {
            //console.log('Planificación [' + planif.idCabeceraPlanificacion + '] cancelada', resp);
            this.fetchAll();
          },
          err => {
            console.log('Se ha producido un error cancelando la planificación', err)
          },
          () => console.log('Finalizó la actualización de la planificación')
        );
      }
    });
  }

  //---------------------------------------------------------------------
  //Filtro para todas las columnas --------------------------------------
  //---------------------------------------------------------------------
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    //if(filterValue.length > 3) {
      this.viajesData.filter = filterValue.trim().toLowerCase();

      if (this.viajesData.paginator) {
         this.viajesData.paginator.firstPage();
      }
    //}
  }


  private getPlanificacionCabeceraCancelaciones(id: string, estado: EstadoPlanificacion ){
  this.viajesService.getById(id)
    .pipe(first())
    .subscribe((planificacion) => {
      //console.log(planificacion);
      this.viajeCancelado= planificacion ;
      this.updateViajeConfirmacion(this.viajeCancelado, estado);
    })
  }

  private getPlanificacionCabeceraPendiente(id: string, estado: EstadoPlanificacion ){
    this.viajesService.getById(id)
      .pipe(first())
      .subscribe((planificacion) => {
        //console.log(planificacion);
        this.viajeCancelado= planificacion ;
        this.updateViajeComentario(this.viajeCancelado, estado);
    })
  }



  // customFilterPredicate() {
  //   const myFilterPredicate = (data: PlanificacionCabeceraGrilla, filter: string): boolean => {

  //     var concat = data.id + data.numero;

  //     if(data.fechaCarga) {
  //       concat += data.fechaCarga.getDay() + "/";
  //       concat += data.fechaCarga.getMonth() + "/";
  //       concat += data.fechaCarga.getFullYear();
  //     }

  //     concat += data.horaCarga;
  //     concat += data.origen + data.destino + data.estado;

  //     return concat.trim().toLowerCase().indexOf(filter) !== -1;
  //   }
  //   return myFilterPredicate;
  // }

}
