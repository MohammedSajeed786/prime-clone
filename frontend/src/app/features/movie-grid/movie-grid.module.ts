import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieGridComponent } from './movie-grid.component';
import { MovieItemModule } from '../movie-item/movie-item.module';



@NgModule({
  declarations: [MovieGridComponent],
  imports: [
    CommonModule,
    MovieItemModule
  ],
  exports:[MovieGridComponent]
})
export class MovieGridModule { }
