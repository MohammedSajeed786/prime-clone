import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieListResponse } from 'src/app/shared/interfaces/MovieListResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieCatalogService {

  url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getAllMovies():Observable<MovieListResponse>{
    return this.http.get<MovieListResponse>(this.url+"movie/allMovies");
  }
}
