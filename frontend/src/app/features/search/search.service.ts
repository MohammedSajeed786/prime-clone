import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/interfaces/Response';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  searchUrl = environment.apiUrl + 'movie/search';
  genresUrl = environment.apiUrl + 'movie/genres';

  searchedMovies: Movie[] = [];
  isLoaded = false;
  sortObj: { id: string; value: string; order: string } | null = null;
  genre: string | null = null;
  genreList = [];
  isGenresLoaded = false;

  //with filters
  getSearchedMovies(searchValue: string): Observable<Response> {
    this.isLoaded = false;
    let params: HttpParams | null = new HttpParams();

    if (this.sortObj && this.sortObj.id != null && this.sortObj.order != null) {
      params = params.append('sortBy', this.sortObj.id);
      params = params.append('sortDirection', this.sortObj.order);
    }

    if (this.genre != null) {
      params = params.append('genre', this.genre);
    }

    return this.http
      .get<Response>(this.searchUrl + '?searchValue=' + searchValue, {
        params: params,
      })
      .pipe(
        tap((res: Response) => {
          this.isLoaded = true;
        })
      );
  }

  //without filters
  getAllSearchedMovies(searchValue: string) {
    this.setSortOptions(null);
    this.setGenreOptions(null);
    return this.getSearchedMovies(searchValue);
  }

  setSortOptions(sortObj: { id: string; value: string; order: string } | null) {
    this.sortObj = sortObj;
  }

  setGenreOptions(genre: string | null) {
    this.genre = genre;
  }

  clearFilters() {
    this.setSortOptions(null);
    this.setGenreOptions(null);
  }
  getAllGenres(): Observable<string[]> {
    if (!this.isGenresLoaded)
      return this.http.get<Response>(this.genresUrl).pipe(
        map((res: Response) => {
          this.isGenresLoaded = true;
          this.genreList = res.data;

          return res.data;
        })
      );
    else return of(this.genreList);
  }

  setSearchedMovies(movies: Movie[]) {
    this.searchedMovies = movies;
  }

  cleanUp() {
    this.setSearchedMovies([]);
    this.clearFilters();
    this.isLoaded = false;
  }
}
