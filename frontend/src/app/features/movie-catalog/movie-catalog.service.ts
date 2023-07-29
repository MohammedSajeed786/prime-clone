import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieListResponse } from 'src/app/shared/interfaces/MovieListResponse';
import { MovieResponse } from 'src/app/shared/interfaces/MovieResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieCatalogService {

  url=environment.apiUrl+'movie/';
  constructor(private http:HttpClient) { }

  getAllMovies():Observable<MovieListResponse>{
    return this.http.get<MovieListResponse>(this.url+"allMovies");
  }

  getAllMoviesGroupedByGenres() :Observable<MovieResponse>{
    return this.http.get<MovieResponse>(this.url+'genres/movies')
  }
}
