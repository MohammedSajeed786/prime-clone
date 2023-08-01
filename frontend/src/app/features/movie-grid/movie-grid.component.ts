import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/MovieListResponse';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent {

  @Input() movies!:Movie[]

}
