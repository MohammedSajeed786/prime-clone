import { Component, OnInit } from '@angular/core';
import { MovieCatalogService } from './movie-catalog.service';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css'],
})
export class MovieCatalogComponent implements OnInit{

  movieListSubscription!:Subscription;

  movieList!:Movie[]

  constructor(private movieCatalogService: MovieCatalogService) {}

  ngOnInit(){
   this.movieListSubscription=this.movieCatalogService.getAllMovies().subscribe({
    next:(value)=> {
        console.log(value)
         this.movieList=value.movies;
    },
    error:(err)=> {
        console.log(err)
    },
   })
  }
}
