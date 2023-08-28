import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../catalog.service';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css'],
})
export class MovieCatalogComponent implements OnInit {
  movieResponseSubscription!: Subscription;

  moviesByGenreList!: { genre: string; movies: Movie[] }[];

  constructor(
    private movieCatalogService: CatalogService,
    private toastService: ToastService,
    private router:Router
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

  navigateToGenrePage(path:string,pathVar:string){
    this.movieCatalogService.setCurrentPage(1);
    this.router.navigate([path,pathVar.toLowerCase()]);
  }
  ngOnDestroy() {
    if(this.movieResponseSubscription)this.movieResponseSubscription.unsubscribe();
  }
}
