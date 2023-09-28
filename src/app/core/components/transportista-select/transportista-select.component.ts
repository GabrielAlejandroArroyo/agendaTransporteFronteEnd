import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Transportista } from '@app/core/models/transportista';
import { TransportistaService } from '@app/core/services/transportista.service';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-transportista-single-select',
  templateUrl: './transportista-select.component.html',
  styleUrls: ['./transportista-select.component.scss']
})
export class TransportistaSelectComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Controles del formulario */
  public transpCtrl:       FormControl = new FormControl();
  public transpFilterCtrl: FormControl = new FormControl();

  /** Array con todos los transportistas */
  public transportistas: Transportista[] = [];

  /** Array con los transportistas filtrados según control transpFilterCtrl */
  public filteredTrans: ReplaySubject<Transportista[]> = new ReplaySubject<Transportista[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed */
  protected _onDestroy = new Subject<void>();

  //Atributos propios para customizar el control
  @Input() labelValue:      string;
  @Input() defaultValue:    Transportista;
  @Input() showSelected:    boolean;

  //Customizaciones del mat-select
  placeholderLabel               = "Buscar";
  noEntriesFoundLabel            = "No se encontraron transportistas";
  indexAndLengthScreenReaderText = ' de ';

  constructor(
    private transpService: TransportistaService
  ) {

   }

  ngOnInit() {
    //busca todos los transportistas
    this.transpService.getAll().subscribe(
      (resp) => this.transportistas = resp);


    // //setea un valor inicial (si lo hubiera)
    // if(!this.initialValue)
    // {
    //   this.transpCtrl.setValue(this.initialValue);
    // }

    // // load the initial transportistas list
    // this.filteredTrans.next(this.transportistas.slice());

    // // listen for search field value changes
    // this.transpFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterTransp();
    //   });
  }

  ngAfterViewInit() {
    //this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredTrans are loaded initially
   */
  // protected setInitialValue() {
  //   this.filteredTrans
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       // setting the compareWith property to a comparison function
  //       // triggers initializing the selection according to the initial value of
  //       // the form control (i.e. _initializeSelection())
  //       // this needs to be done after the filteredTrans are loaded initially
  //       // and after the mat-option elements are available
  //       this.singleSelect.compareWith = (a: Transportista, b: Transportista) => a && b && a.codigo === b.codigo;
  //     });
  // }

  // protected filterTransp() {
  //   if (!this.transportistas) {
  //     return;
  //   }
  //   // obtiene la palabra por la que quieren filtrar
  //   let search = this.transpFilterCtrl.value;
  //   if (!search) {
  //     this.filteredTrans.next(this.transportistas.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   // filtra los transportistas desde el array completo
  //   this.filteredTrans.next(
  //     this.transportistas.filter(transp => transp.nombre.toLowerCase().indexOf(search) > -1)
  //   );
  // }

  onSelectionChange(e: any) {
    //console.log('onSelectionChange exit: ', e);

  }

  // ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
  //   const log: string[] = [];
  //   for (const propName in changes) {
  //     const changedProp = changes[propName];
  //     const to = JSON.stringify(changedProp.currentValue);
  //     if (changedProp.isFirstChange()) {
  //       log.push(`Initial value of ${propName} set to ${to}`);
  //     } else {
  //       const from = JSON.stringify(changedProp.previousValue);
  //       log.push(`${propName} changed from ${from} to ${to}`);
  //     }
  //   }
  //   console.log(log.join(', '));
  // }

}
