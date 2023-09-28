import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@app/core/services/spinner.service';
//import { MatSpinner } from '@angular/material/progress-spinner';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent implements OnInit {

  public isLoading: boolean = false;

  constructor(private spinnerService: SpinnerService) {
    spinnerService.getShowSpinner.subscribe(show => this.changeSpinner(show));
  }

  private changeSpinner(show: boolean): void {
    this.isLoading = show;
  }

  ngOnInit(): void {
  }

}

