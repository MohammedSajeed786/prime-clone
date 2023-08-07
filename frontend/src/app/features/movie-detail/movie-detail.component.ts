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
  showTrailer = false;
  currentUrl = '';
  showShare = false;
  isPresentIncart = false;
  cartItemId:number|null=null;
  moreDetails!: {
    title: string;
    value: any;
  }[];
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private movieDetailService: MovieDetailService,
    private toastServie: ToastService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.currentUrl = location.href;

    this.route.queryParams.subscribe((params) => {
      //get movie Id
      this.movieId = params['movieId'];

      //get movie details
      this.movieDetailSubscription = this.movieDetailService
        .getMovieDetails(this.movieId)
        .subscribe({
          next: (val) => {
            this.movieDetail = val.data;
            this.backgroundImageUrl = `url(${this.movieDetail.backdrop})`;
            this.trailerUrl = this.trailerUrl + this.movieId;
            this.generateMoreDetails();
          },
          error: (err) =>
            this.toastServie.setToastData('error', err.error.message),
        });

      //get trailer token
      this.trailerToken = this.movieDetailService.getTrailerToken();
      if (!this.trailerToken || this.movieDetailService.isTokenExpired()) {
        //if token is not there or expired, fetch it.
        this.generateTrailerToken();
      }

      //check whether present in cart
      this.cartService.isPresentInCart(this.movieId).subscribe({
        next: (cartItemId) => {
          // console.log("hello",cartItemId)
          if(cartItemId){
            this.isPresentIncart = true;
            this.cartItemId=cartItemId;
          }
        },
      });
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
    this.trailerTokenSubscription = this.movieDetailService
      .generateTrailerToken()
      .subscribe({
        next: (res) => {
          this.trailerToken = res.data;
          this.retryVideoLoad();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleVideoError(event: any) {
    // Check if the error is due to an expired token
    if (event.target.error.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
      // Token expired, generate a new token

      this.generateTrailerToken();
    } else {
      // Handle other errors, if needed
      this.toastServie.setToastData('error', event.target.error);
    }
  }

  retryVideoLoad() {
    if (this.videoPlayer) {
      // Get the video element from the template using ViewChild
      const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;
      // Retry loading the video
      videoElement.load();
    }
  }

  addToCart() {
    this.cartService.addToCart(this.movieDetail.movieId).subscribe({
      next: (res) => {
        this.toastServie.setToastData('done',res.message);
        this.isPresentIncart = true;
        this.cartItemId=res.data.cartItemId;
      },
      error: (error) => {
        this.toastServie.setToastData('error', error.err.message);
      },
    });
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.cartItemId as number).subscribe({
      next: (res) => {
        this.toastServie.setToastData('done',res.message);
        this.isPresentIncart = false;
        this.cartItemId=null;
      },
      error: (error) => {
        this.toastServie.setToastData('error', error.err.message);
      },
    });

  }

  ngOnDestroy() {
    if (this.movieDetailSubscription)
      this.movieDetailSubscription.unsubscribe();
    if (this.trailerTokenSubscription)
      this.trailerTokenSubscription.unsubscribe();
  }
}
