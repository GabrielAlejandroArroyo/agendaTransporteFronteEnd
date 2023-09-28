
import { Injectable } from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseURLInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
      const url = `${environment.apiSecureUrl}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
      req = req.clone({ url });
    }
    return next.handle(req);
  }
}
