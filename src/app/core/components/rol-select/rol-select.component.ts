import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Rol } from '@app/core/models/rol';
import { RolService } from '@app/core/services/rol.service';


@Component({
  selector: 'app-rol-single-select',
  templateUrl: './rol-select.component.html',
  styleUrls: ['./rol-select.component.scss']
})
export class RolSelectComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Controles del formulario */
  public rolCtrl:       FormControl = new FormControl();
  public rolFilterCtrl: FormControl = new FormControl();

  /** Array con todos los roles */
  protected roles: Rol[] = [];

  /** Array con los roles filtrados según control rolFilterCtrl */
  public filteredRol: ReplaySubject<Rol[]> = new ReplaySubject<Rol[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed */
  protected _onDestroy = new Subject<void>();

  //Atributos propios para customizar el control
  @Input() labelValue:      string;
  @Input() initialValue:    Rol;
  @Input() showSelected:    boolean;

  //Customizaciones del mat-select
  placeholderLabel    = "Buscar";
  noEntriesFoundLabel = "No se encontraron roles";
  indexAndLengthScreenReaderText = ' de ';

  constructor(
    private rolService: RolService
  ) { }

  ngOnInit() {
    //busca todos los roles
    this.rolService.getAll().subscribe((resp) => this.roles = resp);

    //setea un valor inicial (si lo hubiera)
    if(!this.initialValue)
    {
      this.rolCtrl.setValue(this.initialValue);
    }
    
    // load the initial transportistas list
    this.filteredRol.next(this.roles.slice());

    // listen for search field value changes
    this.rolFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRol();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredTrans are loaded initially
   */
  protected setInitialValue() {
    this.filteredRol
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredTrans are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Rol, b: Rol) => a && b && a.idRol === b.idRol;
      });
  }

  protected filterRol() {
    if (!this.roles) {
      return;
    }
    // obtiene la palabra por la que quieren filtrar
    let search = this.rolFilterCtrl.value;
    if (!search) {
      this.filteredRol.next(this.roles.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filtra los transportistas desde el array completo
    this.filteredRol.next(
      this.roles.filter(rol => rol.descripcion.toLowerCase().indexOf(search) > -1)
    );
  }

}
