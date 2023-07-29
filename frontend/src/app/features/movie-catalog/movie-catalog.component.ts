import { Component, OnInit } from '@angular/core';
import { MovieCatalogService } from './movie-catalog.service';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css'],
})
export class MovieCatalogComponent implements OnInit {
  movieResponseSubscription!: Subscription;

  moviesByGenreList!: {genre:string,movies:Movie[]}[];

  constructor(
    private movieCatalogService: MovieCatalogService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.movieResponseSubscription = this.movieCatalogService
      .getAllMoviesGroupedByGenres()
      .subscribe({
        next: (value) => {
          this.moviesByGenreList = value.data;
          
         
        },
        error: (err) => {
          this.toastService.setToastData('error', err.error.message);
        },
      });
  }

  ngOnDestroy() {
    this.movieResponseSubscription.unsubscribe();
  }
}
