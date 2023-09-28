import { Component , OnInit, ViewChild   } from '@angular/core';

import { Rol } from '@app/core/models/rol';
import { RolService } from '@app/core/services/rol.service';
import { DialogSiNoComponent } from '@app/material/components/dialog-sino/dialog-sino.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/core/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-roles-list',
  styleUrls: ['./roles-list.component.scss'],
  templateUrl: './roles-list.component.html',
})

  export class RolesListComponent implements OnInit {
  public roles: Rol[] = [];
  public rolesData: MatTableDataSource<Rol>;
  public loading = false;
  public esAdmin: boolean = false;
  public displayedColumns: string[] = ['idRol', 'descripcion', 'action'];

  // Popup para confirmar borrado
  private dialogConfig = new MatDialogConfig();

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(
    private rolService:  RolService,
    private authService: AuthService,
    public dialog:       MatDialog,
  ) { 
      this.esAdmin = authService.esAdmin();

      this.dialogConfig.disableClose  = false;
      this.dialogConfig.autoFocus     = true;
      this.dialogConfig.width         = '450px';
  }
  
  public ngOnInit(): void {
    this.fetchRoles();
  }

  public fetchRoles(): void {
    this.rolService.getAll().subscribe((roles) => {
        this.rolesData = new MatTableDataSource(roles);
        this.rolesData.paginator = this.paginator;
        this.rolesData.filterPredicate = this.customFilterPredicate();
        this.rolesData.sort = this.sort;
      });
  }

  public deleteRol(id: string): void {

    this.dialogConfig.data = {
      mensaje:    'Está seguro que desea eliminar el rol?',
      label:      '',
      comentario: '',
    };

    const dialogRef = this.dialog.open(DialogSiNoComponent, this.dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) { //Si contestó SI
        this.rolService.delete(id).subscribe((rta) => {
          this.fetchRoles();
        });
      }
    });

  }

  //---------------------------------------------------------------------
  //Filtro para todas las columnas --------------------------------------
  //---------------------------------------------------------------------
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    this.rolesData.filter = filterValue.trim().toLowerCase();

    if (this.rolesData.paginator) {
      this.rolesData.paginator.firstPage();
    }
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Rol, filter: string): boolean => {
      var concat = data.idRol + data.descripcion;
      return concat.trim().toLowerCase().indexOf(filter) !== -1;
    }
    return myFilterPredicate;
  }

}
