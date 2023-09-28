import { HttpResponse } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { SpinnerService } from '@app/core/services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private exceptions: string[] = [
    'login',
  ];

  constructor(public spinnerService: SpinnerService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();

    return next
    .handle(req)
    .pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.spinnerService.hide();
            }
        },
        (error) => {
            this.spinnerService.hide();
        }),
        finalize(() => {
          this.spinnerService.hide();
        })
    );
  }
}
