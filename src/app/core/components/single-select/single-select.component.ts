import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ReplaySubject, Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-single-select",
  templateUrl: "./single-select.component.html",
  styleUrls: ["./single-select.component.scss"]
})
export class SingleSelectComponent implements OnInit, OnDestroy {

  @Input() dataSource: Array<any>;
  @Input() inputType: String;
  @Input() dataShow: string; //nombre del campo que tiene la DESC
  @Input() dataValue: string; //nombre del campo que tiene el ID
  @Input() defaultValue: any;
  @Input() placeholder: string;
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();

  formData: FormGroup;

  public inputFilter: FormControl = new FormControl();
  public controlFilter: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  private _changeSubscription: Subscription = null;
  protected _onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    if (this._changeSubscription !== null) {
      this._changeSubscription.unsubscribe();
    }
  } 

  createForm() {
    this.formData = new FormGroup({
      valueSelect: new FormControl(this.dataSource),
      selectType: new FormControl(this.inputType)
    });

    if (this.dataSource != null) {
      this.setInitialValue();

      this._changeSubscription = this.formData.valueChanges.subscribe(data => {
        this.onSelectionChange.emit(data);
      });

      this.inputFilter.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterData();
        });
    }
  }

  setInitialValue() {
    this.controlFilter.next(this.dataSource.slice());

    if(this.defaultValue != null)
    {
      this.formData
        .get("valueSelect")
        .setValue(this.defaultValue[this.dataValue]);
    }
    else{
      alert("sin default");
    }
  }

  protected filterData() {
    if (!this.dataSource) {
      return;
    }

    let search = this.inputFilter.value;
    if (!search) {
      this.controlFilter.next(this.dataSource.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.controlFilter.next(
      this.dataSource.filter(
        data => data[this.dataShow].toLowerCase().indexOf(search) > -1
      )
    );
  }
}
