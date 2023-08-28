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
  sortObj: { id: string; value: string; order: string } | null = null;
  currentPage = 1;
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<MovieListResponse> {
    return this.http.get<MovieListResponse>(this.url + 'allMovies');
  }

  getAllMoviesGroupedByGenres(): Observable<Response> {
    return this.http.get<Response>(this.url + 'genres/movies');
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }
  getCurrentPage() {
    return this.currentPage;
  }

  getAllMoviesByGenre(
    genre: string,
    page: number
  ): Observable<MovieListResponse> {
    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.set('page', page);
    if (this.sortObj && this.sortObj.id != null && this.sortObj.order != null) {
      httpParams = httpParams.append('sortBy', this.sortObj.id);
      httpParams = httpParams.append('sortDirection', this.sortObj.order);
    }

    return this.http.get<MovieListResponse>(
      this.url + `genre/${genre}/allMovies`,
      {
        params: httpParams,
      }
    );
  }
  setSortOptions(sortObj: { id: string; value: string; order: string } | null) {
    this.sortObj = sortObj;
  }

  clearFilters() {
    this.setSortOptions(null);
  }

  cleanUp() {
    this.clearFilters();
  }
}
