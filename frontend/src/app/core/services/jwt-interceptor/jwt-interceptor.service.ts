import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
``;
@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  private url = environment.apiUrl;
  private filteredRequets = [
    'auth/login',
    'auth/register',
    ,
    'auth/sendOtp',
    'auth/verifyOtp',
    'auth/updatePassword',
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private spinner: NgxSpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //get the token
    let token = this.authService.getToken();

    this.spinner.show();

    if (!this.filteredRequets.includes(req.url.split(this.url)[1])) {
      //check whether the request needs token or not
      // console.log(req.url.split(this.url)[1]);

      if (token && !this.authService.isTokenExpired()) {
        //send the request only if token exists and not expired
        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
          },
        });
      } else {
        //if token expired or does not exists
        this.spinner.hide();
        this.authService.logout();
        this.toastService.setToastData(
          'info',
          'Token expired please login again'
        );
        return throwError('Token expired please login again');
      }
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
