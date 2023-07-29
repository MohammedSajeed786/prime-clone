import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {
   @Input() movieInfo!:Movie;
   
}
