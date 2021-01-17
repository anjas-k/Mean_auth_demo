import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Router } from '@angular/router';
import { Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,private router:Router
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: any, caught: Observable<HttpEvent<any>>) => {
                if(err instanceof HttpErrorResponse) {
                    if (err.status == 401) {
                        console.log("Unauthorised. Logging out...");
                        this.authService.logout();
                        this.router.navigate(['login']);
                    }
                }
                return throwError(err);
            })
        );
    }
}