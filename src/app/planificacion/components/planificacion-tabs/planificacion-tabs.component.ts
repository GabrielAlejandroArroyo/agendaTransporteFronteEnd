import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { FormControl } from '@angular/forms';
import { PlanificacionListComponent } from '../planificacion-list/planificacion-list.component';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '@app/core/services/spinner.service';

@Component({
  selector: 'app-planificacion-tabs',
  templateUrl: './planificacion-tabs.component.html',
  styleUrls: ['./planificacion-tabs.component.scss']
})
export class PlanificacionTabsComponent implements OnInit, AfterViewInit{

  public esAdmin:         boolean;
  public esPlanificador:  boolean;
  public esTransportista: boolean;


  @ViewChild(PlanificacionListComponent) viajesPendientesCtrl: PlanificacionListComponent;
  @ViewChild(PlanificacionListComponent) viajesReservadosCtrl: PlanificacionListComponent;
  @ViewChild(PlanificacionListComponent) viajesIngresadosCtrl: PlanificacionListComponent;
  @ViewChild(PlanificacionListComponent) viajesCtrl          : PlanificacionListComponent;

  constructor(
    private authService: AuthService,
    private router:Router,
    private spinner:SpinnerService,
  ) {
    this.esAdmin          = this.authService.esAdmin();
    this.esPlanificador   = this.authService.esPlanificador();
    this.esTransportista  = this.authService.esTransportista();

  }

  ngOnInit(): void {
    this.spinner.show();
  }
  ngAfterViewInit(): void {

  }

  onTabClick(e) {
    //console.log(e);
    if(e.index === 0){
      //Hay que cargar la lista con los pendientes
      this.viajesPendientesCtrl.fetchPendientes();

    } else if(e.index === 1) { // 1 lista con los reservados
      this.viajesReservadosCtrl.fetchReservados();

    } else if(e.index === 2){ // 2 carga los viajes del transportista en otros estados
      this.viajesIngresadosCtrl.fetchIngresados();
    }else if(e.index === 3){ // 2 carga los viajes del transportista en otros estados
      this.viajesCtrl.fetchAll();
    }
  }
}
