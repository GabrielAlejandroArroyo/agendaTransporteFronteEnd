import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private isLoading = new BehaviorSubject<boolean>(false);

  constructor() { }

  public get getShowSpinner(): any {
    return this.isLoading.asObservable();
  }

  public show(): void {
      this.isLoading.next(true);
  }

  public hide(): void {
      this.isLoading.next(false);
  }

}
