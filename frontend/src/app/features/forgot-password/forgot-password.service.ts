import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  updatePasswordUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient) {}

  sendOtp(email: string): Observable<string> {
    let body = {
      email: email,
    };
    return this.http.post(this.updatePasswordUrl + 'sendOtp', body, {
      responseType: 'text',
    });
  }

  verifyOtp(email:string,otp:number):Observable<string> {
    let body = {
      email: email,
      otp:otp
    };
    return this.http.post(this.updatePasswordUrl + 'verifyOtp', body, {
      responseType: 'text',
    });
  }
  
  updatePassword(email:string,password:string):Observable<string> {
    let body = {
      email: email,
      newPassword:password
    };
    return this.http.post(this.updatePasswordUrl + 'updatePassword', body, {
      responseType: 'text',
    });
  }

  
}
