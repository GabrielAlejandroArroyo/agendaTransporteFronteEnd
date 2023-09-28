import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest , HttpInterceptor } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AlertService } from '@app/core/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      retry(0),
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // backend error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }

        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        this.alertService.error(errorMessage);
        //console.log(errorMessage);
        return throwError(error);
      })
    );
  }
}
