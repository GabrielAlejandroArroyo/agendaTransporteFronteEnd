import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { AppConstants } from '@app/app.constants';


@Injectable({ providedIn: 'root' })
export class AlertService {
    // private subject = new Subject<Alert>();
    // private defaultId = 'default-alert';
    private configsnack = new MatSnackBarConfig();

    constructor(
      private _matSnackBar: MatSnackBar,
      ) {
        this.configsnack.duration = AppConstants.timesnackBar;
      }

    // // enable subscribing to alerts observable
    // public onAlert(id = this.defaultId): Observable<Alert> {
    //     return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
    // }

    // convenience methods
    public success(message: string, options?: any): void {
        this._matSnackBar.open(message, "OK", {
            //panelClass: ['notif-success'],
        });
    }

    public error(message: string, options?: any): void {
        this._matSnackBar.open(message, "OK", {
            //panelClass: ['error-snackbar'],
        });
    }

    public info(message: string, options?: any): void {
        this._matSnackBar.open(message, "OK");
    }

    public warn(message: string, options?: any): void {
        this._matSnackBar.open(message, "OK");
    }

    // // clear alerts
    // public clear(id = this.defaultId): void {
    //     this.subject.next(new Alert({ id }));
    // }


    // openSuccessSnackBar(message: string){
    //     this.matSnackBar.open(message, "OK", {
    //         duration: AppConstants.timesnackBar+1000,
    //         panelClass: ['green-snackbar'],
    //     });
    // }

    // //Snackbar that opens with failure background
    // openFailureSnackBar(message: string){
    //     this.matSnackBar.open(message, "Reintentar", {
    //         duration: AppConstants.timesnackBar+1000,
    //         panelClass: ['red-snackbar'],
    //         });
    // }

}
