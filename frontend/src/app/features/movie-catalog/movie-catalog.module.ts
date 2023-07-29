import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCatalogRoutingModule } from './movie-catalog-routing.module';
import { MovieItemModule } from '../movie-item/movie-item.module';
import { MovieCatalogComponent } from './movie-catalog.component';



@NgModule({
  declarations: [MovieCatalogComponent],
  imports: [
    CommonModule,
    MovieCatalogRoutingModule,
    MovieItemModule
  ],
  exports:[MovieCatalogComponent]
})
export class MovieCatalogModule { }
