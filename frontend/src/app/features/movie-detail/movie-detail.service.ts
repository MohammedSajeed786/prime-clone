import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MovieDetail } from 'src/app/shared/interfaces/MovieDetail';
import { Response } from 'src/app/shared/interfaces/Response';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  url = environment.apiUrl + 'movie/';

  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: number) {
    return this.http.get<Response>(this.url + 'movieDetails/' + movieId);
  }

  getTrailerToken() {
    return localStorage.getItem('trailerToken');
  }
  getMovieToken() {
    return localStorage.getItem('movieToken');
  }
  setTrailerToken(token: string) {
    localStorage.setItem('trailerToken', token);
  }
  setMovieToken(token: string) {
    localStorage.setItem('movieToken', token);
  }

  clearTrailerToken() {
    localStorage.removeItem('trailerToken');
  }
  clearMovieToken() {
    localStorage.removeItem('movieToken');
  }

  generateTrailerToken() {
    return this.http.get<Response>(this.url + 'token/trailer').pipe(
      tap((res) => {
        this.setTrailerToken(res.data);
      })
    );
  }

  generateMovieToken(movieId:number) {
    return this.http.get<Response>(this.url + 'token/movie/'+movieId).pipe(
      tap((res) => {
        this.setMovieToken(res.data);
      })
    );
  }

  isTokenExpired(token: string): boolean {
    // let token = this.getTrailerToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    }
    return true;
  }
  cleanUp(){
    this.clearMovieToken();
    this.clearTrailerToken();
  }
}
