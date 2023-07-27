import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  private url = environment.apiUrl;
  private filteredRequets = ['auth/login', 'auth/register'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //get the token
    let token = this.authService.getToken();

    if (!this.filteredRequets.includes(req.url.split(this.url)[1])) {
      //check whether the request needs token or not
      console.log(req.url.split(this.url)[1]);

      if (token && !this.authService.isTokenExpired()) {
        //send the request only if token exists and not expired
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
          },
        });
      } else {
        //if token expired or does not exists

        this.router.navigate(['/login']);
        this.toastService.setToastData(
          'info',
          'Token expired please login again'
        );
        return throwError('Token expired please login again');
      }
    }

    return next.handle(req);
  }
}
