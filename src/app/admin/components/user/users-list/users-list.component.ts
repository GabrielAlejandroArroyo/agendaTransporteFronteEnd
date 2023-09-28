import { Component , OnInit, ViewChild   } from '@angular/core';

import { UserGrilla } from '@app/core/models/user_grilla';
import { UserService } from '@app/core/services/user.services';
import { DialogSiNoComponent } from '@app/material/components/dialog-sino/dialog-sino.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@app/core/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  styleUrls: ['./users-list.component.scss'],
  templateUrl: './users-list.component.html',
})

  export class UserListComponent implements OnInit {
  public usersData: MatTableDataSource<UserGrilla>;
  public loading = false;
  public esAdmin: boolean = false;
  public displayedColumns: string[] = ['idUsuario', 'user', 'transpGrillaStr', 'rolGrillaStr', 'action'];

  // Popup para confirmar borrado
  private dialogConfig = new MatDialogConfig();

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialog:       MatDialog,

  ) {
    this.esAdmin = authService.esAdmin();

    this.dialogConfig.disableClose  = false;
    this.dialogConfig.autoFocus     = true;
    this.dialogConfig.width         = '450px';
  }

  public ngOnInit(): void {
    this.fetchUsers();
  }

  public fetchUsers(): void {
    this.userService.getAll().subscribe((users) => {

    //console.log(viajes);
    let usersGrilla: UserGrilla[] = [];

    users.forEach(function (usu) {
      usersGrilla.push(new UserGrilla(usu));
    });

    this.usersData = new MatTableDataSource(usersGrilla);
    this.usersData.paginator = this.paginator;
    this.usersData.sort = this.sort;

    });
  }

  // Abre la ventana de confirmaciòn y actualiza borra si da OK
  public deleteUser(id: string) {

    this.dialogConfig.data = {
      mensaje:    'Está seguro que desea eliminar el usuario?',
      label:      '',
      comentario: '',
    };

    const dialogRef = this.dialog.open(DialogSiNoComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) { //Si contestó SI
        this.userService.delete(id).subscribe((rta) => {
          this.fetchUsers();
        });
      }
    });
  }


  //---------------------------------------------------------------------
  //Filtro para todas las columnas --------------------------------------
  //---------------------------------------------------------------------
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    this.usersData.filter = filterValue.trim().toLowerCase();

    if (this.usersData.paginator) {
      this.usersData.paginator.firstPage();
    }
  }

  // customFilterPredicate() {
  //   const myFilterPredicate = (data: User, filter: string): boolean => {
  //     var concat = data.idUsuario + data.user + data.transportista?.nombre + data.usuarioRol[0]?.rol.descripcion;
  //     return concat.trim().toLowerCase().indexOf(filter) !== -1;
  //   }
  //   return myFilterPredicate;
  // }

}

