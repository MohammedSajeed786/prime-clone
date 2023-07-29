import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from './movie-item.component';
import { DurationPipe } from 'src/app/shared/pipes/duration/duration.pipe';



@NgModule({
  declarations: [MovieItemComponent,DurationPipe],
  imports: [
    CommonModule,
    
  ],
  exports:[MovieItemComponent]
})
export class MovieItemModule { }
