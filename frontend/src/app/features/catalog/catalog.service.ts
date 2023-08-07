import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieListResponse } from 'src/app/shared/interfaces/MovieListResponse';
import { Response } from 'src/app/shared/interfaces/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  url = environment.apiUrl + 'movie/';
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<MovieListResponse> {
    return this.http.get<MovieListResponse>(this.url + 'allMovies');
  }

  getAllMoviesGroupedByGenres(): Observable<Response> {
    return this.http.get<Response>(this.url + 'genres/movies');
  }

  getAllMoviesByGenre(
    genre: string,
    page: number
  ): Observable<MovieListResponse> {
    let httpParams: HttpParams = new HttpParams();

    httpParams=httpParams.set('page', page);

    return this.http.get<MovieListResponse>(
      this.url + `genre/${genre}/allMovies`,
      {
        params: httpParams,
      }
    );
  }
}
