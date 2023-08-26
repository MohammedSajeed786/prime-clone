import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';
import { CatalogService } from '../../catalog.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
export interface Filter {
  type: string;
  data: {
    id: string;
    value: string;
    order?: string;
  }[];
  default: string | null;
}
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
  sortFilter: Filter = {
    type: 'sort',
    data: [
      {
        id: 'title',
        value: 'title',
        order: 'ASC',
      },
      {
        id: 'rating',
        value: 'rating',
        order: 'DESC',
      },
      {
        id: 'price',
        value: 'price - low to high',
        order: 'ASC',
      },
      {
        id: 'price',
        value: 'price - high to low',
        order: 'DESC',
      },
      {
        id: 'releaseYear',
        value: 'release year - latest first',
        order: 'DESC',
      },
      {
        id: 'releaseYear',
        value: 'release year - oldest first',
        order: 'ASC',
      },
    ],
    default: null,
  };
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
      this.currentPage = this.catalogService.getCurrentPage();
      // console.log(this.currentPage)
      this.getGenreMovies(this.currentPage);
    });

    this.subscriptions.push(routingSubscription);

    this.sortFilter.default = this.catalogService.sortObj?.value
      ? this.catalogService.sortObj?.value
      : null;
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
            // if (page == 1)
              this.calculatePages(
                value.currentPage,
                value.pageSize,
                value.currentPageSize,
                value.totalResults
              );
            // else this.currentPage = value.currentPage;
            this.movieList = value.movies;
          },
          error: (err) => {
            this.toastService.setToastData('error', err.error.message);
          },
        });
      this.subscriptions.push(movieListSubscription);
    }
  }

  calculatePages(currentPage: number, pageSize: number, cureentPageSize:number,totalResults: number) {
    this.currentPage = currentPage;
    this.totalPages = Math.ceil(totalResults / pageSize);
  }

  sortFilterChanged(event: any) {
    // this.searchService.isLoaded = false;
    this.catalogService.setSortOptions(event);
    this.sortFilter.default = event.value;
    this.getGenreMovies(1);
  }

  changePage(page: number) {
    this.catalogService.setCurrentPage(page);
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
