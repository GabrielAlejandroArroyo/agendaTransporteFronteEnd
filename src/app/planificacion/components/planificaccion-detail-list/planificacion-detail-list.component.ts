import { Component , OnInit, ViewChild,Input, Output, EventEmitter   } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PlanificacionDetalle } from '@app/core/models/planificacion_detalle';
import { PlanificacionDetalleService } from '@app/core/services/planificacion_detalle.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-planificacion-detail-list',
  templateUrl: './planificacion-detail-list.component.html',
  styleUrls: ['./planificacion-detail-list.component.scss']
})
export class PlanificacionDetailListComponent implements OnInit {
  public planificacionDetalles: PlanificacionDetalle[] = [];
  public  planificacionDetallesData: MatTableDataSource<PlanificacionDetalle>;
  public loading = false;
  public esAdmin: boolean = false;
  public displayedColumns: string[] = ['idDetallePlanificacion','fechaHoraCreacion', 'usuarioModificador', 'estado', 'equipo','chofer','action'];
  public detalles:  PlanificacionDetalle[] = null;
  public idDetail:string;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;
/*   @Input() planificacionDetalle: PlanificacionDetalle[]; */

  constructor(
    private planificacionDetalleService: PlanificacionDetalleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.esAdmin = authService.esAdmin();
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idDetail = params.id;
      // Modifica / visualiza / Reserva una planificacion existente (Datos necesarios (Almacen para Tractor/Chofer - Transportista para Equipo/Tractor/Chofer )
      if (this.idDetail){
        this.fetchDetails(params.id);
        //console.log('Carga planificacionDetallesData: '  + this.planificacionDetallesData.filteredData);
      }
    })
  }

  public fetchDetails(id : string): void {
    this.planificacionDetalleService.getByIdcabecera(id).subscribe((detalles) => {
      this.planificacionDetalles = detalles;
      this.planificacionDetallesData = new MatTableDataSource(detalles);

      this.planificacionDetallesData.paginator = this.paginator;
      //this.planificacionDetallesData.filterPredicate = this.customFilterPredicate();
      this.planificacionDetallesData.sort = this.sort;
    });
  }


  //---------------------------------------------------------------------
  //Filtro para todas las columnas --------------------------------------
  //---------------------------------------------------------------------
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    this.planificacionDetallesData.filter = filterValue.trim().toLowerCase();

    if (this.planificacionDetallesData.paginator) {
      this.planificacionDetallesData.paginator.firstPage();
    }
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: PlanificacionDetalle, filter: string): boolean => {
/*       var concat = data.fechaHoraCreacion + data.usuario + data.transportista?.nombre + data.usuarioRol[0]?.rol.descripcion; */
/* 'fechaHoraCreacion', 'usuarioModificador', 'estado', 'equipo','chofer','action' */
      var concat = data.fechaHoraCreacion + data.usuario.user + data.estado.descripcion ;
      var concat ='';
      return concat.trim().toLowerCase().indexOf(filter) !== -1;
    }
    return myFilterPredicate;
  }

  public ver(id: string){
    this.router.navigate(['viajesdetalle/view/', {id}]);
  }

}
