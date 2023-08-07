import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Movie} from 'src/app/shared/interfaces/MovieListResponse';
import { CatalogService } from '../../catalog.service';
import { ToastService} from 'src/app/shared/components/toast/toast.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-genre-catalog',
  templateUrl: './genre-catalog.component.html',
  styleUrls: ['./genre-catalog.component.css'],
})
export class GenreCatalogComponent implements OnInit, OnDestroy {
  genre!: string | null;
  movieList!: Movie[];
  currentPage: number = 1;
  totalPages!: number;
  subscriptions: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private toastService: ToastService,
    private location: Location
  ) {}

  ngOnInit() {
    let routingSubscription = this.route.paramMap.subscribe((param) => {
      this.genre = param.get('genre');
      if (this.genre) this.genre = this.genre.replaceAll('-', ' ');
      this.getGenreMovies(this.currentPage);
    });

    this.subscriptions.push(routingSubscription);
  }

  range(pages: number) {
    let pagesRange = new Array();
    for (let i = 1; i <= pages; i++) pagesRange.push(i);
    return pagesRange;
  }

  getGenreMovies(page: number) {
    if (this.genre) {
      let movieListSubscription = this.catalogService
        .getAllMoviesByGenre(this.genre, page)
        .subscribe({
          next: (value) => {
            if (page == 1)
              this.calculatePages(
                value.currentPage,
                value.pageSize,
                value.totalResults
              );
            else this.currentPage = value.currentPage;
            this.movieList = value.movies;
          },
          error: (err) => {
            this.toastService.setToastData('error', err.error.message);
          },
        });
      this.subscriptions.push(movieListSubscription);
    }
  }

  calculatePages(currentPage: number, pageSize: number, totalResults: number) {
    this.currentPage = currentPage;
    this.totalPages = Math.ceil(totalResults / pageSize);
  }

  changePage(page: number) {
    this.getGenreMovies(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  backClick() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
