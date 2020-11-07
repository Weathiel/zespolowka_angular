import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { request } from 'http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(httpRequest: HttpRequest<any>, nextHandler: HttpHandler): Observable<HttpEvent<any>> {
        const curUser = this.authService.currentUserValue;
        if (curUser && curUser.token) {
            httpRequest = httpRequest.clone({
                setHeaders: {
                    Authorization: `Bearer ` + curUser.token
                }
            });
        }
        return nextHandler.handle(httpRequest);
    }

}
