import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (this.authService.isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${this.authService.getCurrentJwtToken}`,
                },
            });
        }
        return next.handle(request);
    }
}
