import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService  {
  private url = environment.apiUrl;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.setisLoggedIn$(true);
    }
  }

 

  login(body: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + 'auth/login', body);
  }

  register(body: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + 'auth/register', body);
  }

  logout() {
    this.clearToken();
    this.setisLoggedIn$(false);
    this.router.navigate(['/landingPage']);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  setisLoggedIn$(val: boolean) {
    this.isLoggedIn$.next(val);
  }

  getIsLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  isTokenExpired(): boolean {
    let token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    }
    return true;
  }
}
