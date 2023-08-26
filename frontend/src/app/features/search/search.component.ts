import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subscription, of } from 'rxjs';
import { Subscriptions } from 'razorpay/dist/types/subscriptions';

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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchedMovies!: Movie[];
  searchValue: string | null = '';
  subcriptions: Subscription[] = [];

  genreFilter!: Filter;
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
    private searchService: SearchService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.subcriptions.push(
      this.route.paramMap.subscribe({
        next: (param) => {
          this.searchValue = param
            .get('searchValue')
            ?.replaceAll('-', ' ')
            .replaceAll('-', '/') as string;
          this.getSearchedMovies();
          this.getGenres();
          this.sortFilter.default = this.searchService.sortObj?.value
            ? this.searchService.sortObj?.value
            : null;
        },
      })
    );
  }

  getGenres() {
    //get genres
    this.subcriptions.push(
      this.searchService.getAllGenres().subscribe({
        next: (genresList) => {
          let genreValue: { id: string; value: string }[] = [];
          genresList.forEach((genre) =>
            genreValue.push({
              id: genre,
              value: genre,
            })
          );
          this.genreFilter = {
            type: 'genre',
            default: this.searchService.genre,
            data: genreValue,
          };
        },
      }) as Subscription
    );
  }
  getSearchedMovies() {
    this.subcriptions.push(
      this.searchService
        .getSearchedMovies(this.searchValue as string)
        .subscribe({
          next: (res) => {
            this.searchedMovies = res.data;
          },
        })
    );
  }

  genreFilterChanged(event: any) {
    // this.searchService.isLoaded = false;
    this.searchService.setGenreOptions(event.id);
    this.genreFilter.default = event.id;
    this.getSearchedMovies();
  }
  sortFilterChanged(event: any) {
    // this.searchService.isLoaded = false;
    // console.log(event);
    this.searchService.setSortOptions(event);
    this.sortFilter.default = event.value;

    this.getSearchedMovies();
  }

  backClick() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subcriptions.forEach((subscription) => {
      if (subscription) subscription.unsubscribe();
    });
  }
}
