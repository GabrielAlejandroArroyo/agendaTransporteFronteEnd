import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../core/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    ) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(

        catchError((err) => {

        let mensaje: string = '';

        if (err.status === 401) {
          // auto logout if 401 response returned from api
          mensaje = 'No está autorizado a ingresar a ésta página.';
        }

        //Not found (404) //Ruta no encontrada
        if (err.status === 404) {
          //Ruta no encontrada
          mensaje = 'No se puede encontrar la página solicitada: ' + err.url;
        }

        if (err.status === 500 || err.status === 0) {
          mensaje = 'Hubo un error al procesar su solicitud.';
        }else
        {
          mensaje = 'Sin conexion';
        }


        console.log('ErrorInterceptor => ' + mensaje);
        this.alertService.error(mensaje);

        const error = err.error.message || err.statusText;
        return throwError(error);

      }));
    }

}
