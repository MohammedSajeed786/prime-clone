import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieDetailService } from './movie-detail.service';
import { MovieDetail } from 'src/app/shared/interfaces/MovieDetail';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { environment } from 'src/environments/environment';
import { CartService } from '../cart/cart.service';
import { VaultService } from '../vault/vault.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movieId!: number;
  movieDetailSubscription!: Subscription;
  movieDetail!: MovieDetail;
  backgroundImageUrl = '';
  trailerUrl = environment.apiUrl + 'movie/trailer/';
  trailerToken: string | null = '';
  trailerTokenSubscription!: Subscription;
  movieUrl = environment.apiUrl + 'movie/fullMovie/';
  movieToken: string | null = '';
  movieTokenSubscription!: Subscription;
  showTrailer = false;
  showMovie = false;
  currentUrl = '';
  showShare = false;
  isPresentIncart = false;
  cartItemId: number | null = null;
  moreDetails!: {
    title: string;
    value: any;
  }[];
  cartSubscription!: Subscription;
  isPresentInVault = false;
  vaultSubscription!: Subscription;
  subscriptions: Subscription[]=[];

  @ViewChild('trailerPlayer', { static: true }) trailerPlayer!: ElementRef;
  @ViewChild('moviePlayer', { static: true }) moviePlayer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private movieDetailService: MovieDetailService,
    private toastService: ToastService,
    private cartService: CartService,
    private vaultService: VaultService,
    private location: Location
  ) {}

  ngOnInit() {
    this.currentUrl = location.href;

    this.route.queryParams.subscribe((params) => {
      //get movie Id
      this.movieId = params['movieId'];

      //get movie details
      this.subscriptions.push(
        this.movieDetailService.getMovieDetails(this.movieId).subscribe({
          next: (val) => {
            this.movieDetail = val.data;
            this.backgroundImageUrl = `url(${this.movieDetail.backdrop})`;
            this.trailerUrl = this.trailerUrl + this.movieId;
            this.movieUrl = this.movieUrl + this.movieId;

            this.generateMoreDetails();
          },
          error: (err) =>
            this.toastService.setToastData('error', err.error.message),
        })
      );

      //get trailer token
      this.trailerToken = this.movieDetailService.getTrailerToken();
      if (
        !this.trailerToken ||
        this.movieDetailService.isTokenExpired(this.trailerToken)
      ) {
        //if token is not there or expired, fetch it.
        this.generateTrailerToken();
      }

      //check whether present in cart
      this.subscriptions.push(
        this.cartService.isPresentInCart(this.movieId).subscribe({
          next: (cartItemId) => {
            // console.log("hello",cartItemId)
            if (cartItemId) {
              this.isPresentIncart = true;
              this.cartItemId = cartItemId;
            }
          },
        })
      );

      //check whether present in vault
      this.subscriptions.push(
        this.vaultService.isPresentInVault(this.movieId).subscribe({
          next: (isPresentInVault) => {
            //is movie is present in vault fetch the movie from backend
            if (isPresentInVault) {
              this.isPresentInVault = true;
              this.movieToken = this.movieDetailService.getMovieToken();
              if (
                !this.movieToken ||
                this.movieDetailService.isTokenExpired(this.movieToken)
              ) {
                //if token is not there or expired, fetch it.
                this.generateMovieToken(this.movieId);
              }
            }
          },
        })
      );
    });
  }

  generateMoreDetails() {
    this.moreDetails = [
      {
        title: 'languages',
        value: this.movieDetail.language,
      },
      {
        title: 'producers',
        value: this.movieDetail.producer,
      },
      {
        title: 'directors',
        value: this.movieDetail.director,
      },
      {
        title: 'Starring',
        value: this.movieDetail.casts.join(', '),
      },
    ];
  }
  generateTrailerToken() {
    this.subscriptions.push(
      this.movieDetailService.generateTrailerToken().subscribe({
        next: (res) => {
          this.trailerToken = res.data;
          this.retryVideoLoad(this.trailerPlayer);
        },
        error: (err) => {
          this.toastService.setToastData('error', err.error.message);
        },
      })
    );
  }

  generateMovieToken(movieId: number) {
    this.subscriptions.push(
      this.movieDetailService.generateMovieToken(movieId).subscribe({
        next: (res) => {
          // console.log(res)
          this.movieToken = res.data;

          this.retryVideoLoad(this.moviePlayer);
        },
        error: (err) => {
          this.toastService.setToastData('error', err.error.message);
        },
      })
    );
  }

  handleVideoError(event: any, type: string) {
    // Check if the error is due to an expired token
    if (event.target.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
      // Token expired, generate a new token

      if (type == 'trailer') this.generateTrailerToken();
      else if (type == 'movie')
        this.generateMovieToken(this.movieDetail.movieId);
    } else {
      // Handle other errors, if needed
      this.toastService.setToastData('error', event.target.error);
    }
  }

  retryVideoLoad(videoPlayer: ElementRef) {
    if (videoPlayer) {
      // Get the video element from the template using ViewChild
      const videoElement: HTMLVideoElement = videoPlayer.nativeElement;
      // Retry loading the video
      videoElement.load();
    }
  }

  addToCart() {
    this.subscriptions.push(
      this.cartService.addToCart(this.movieDetail.movieId).subscribe({
        next: (res) => {
          this.toastService.setToastData('done', res.message);
          this.isPresentIncart = true;
          this.cartItemId = res.data.cartItemId;
        },
        error: (error) => {
          this.toastService.setToastData('error', error.err.message);
        },
      })
    );
  }

  removeFromCart() {
    this.subscriptions.push(
      this.cartService.removeFromCart(this.cartItemId as number).subscribe({
        next: (res) => {
          this.toastService.setToastData('done', res.message);
          this.isPresentIncart = false;
          this.cartItemId = null;
        },
        error: (error) => {
          this.toastService.setToastData('error', error.err.message);
        },
      })
    );
  }
  backClick() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      if (sub) sub.unsubscribe();
    });
  }
}
