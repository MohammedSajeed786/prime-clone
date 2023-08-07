import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailRoutingModule } from './movie-detail-routing.module';
import { MovieDetailComponent } from './movie-detail.component';
import { DurationPipe } from 'src/app/shared/pipes/duration/duration.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';




@NgModule({
  declarations: [MovieDetailComponent],
  imports: [
    CommonModule,
    MovieDetailRoutingModule,
    SharedModule,
    ShareButtonsModule,
    ShareIconsModule
  ], 
  exports:[MovieDetailComponent]
})
export class MovieDetailModule { }
