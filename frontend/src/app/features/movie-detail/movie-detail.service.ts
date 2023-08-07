import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MovieDetail } from 'src/app/shared/interfaces/MovieDetail';
import {Response } from 'src/app/shared/interfaces/Response';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  url = environment.apiUrl + 'movie/';

  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: number) {
    return this.http
      .get<Response>(this.url + 'movieDetails/' + movieId)
      
  }

  getTrailerToken() {
    return localStorage.getItem('trailerToken');
  }

  setTrailerToken(token: string) {
    localStorage.setItem('trailerToken', token);
  }

  clearTrailerToken() {
    localStorage.removeItem('trailerToken');
  }

  generateTrailerToken() {
    return this.http.get<Response>(this.url + 'token/trailer').pipe(
      tap((res) => {
        this.setTrailerToken(res.data);
      })
    );;
  }

  isTokenExpired(): boolean {
    let token = this.getTrailerToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    }
    return true;
  }
}
