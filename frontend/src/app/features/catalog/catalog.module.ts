import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { MovieItemModule } from '../movie-item/movie-item.module';
import { MovieCatalogComponent } from './components/movie-catalog/movie-catalog.component';
import { MovieGridModule } from '../movie-grid/movie-grid.module';
import { GenreCatalogComponent } from './components/genre-catalog/genre-catalog.component';

@NgModule({
  declarations: [MovieCatalogComponent,GenreCatalogComponent],
  imports: [CommonModule, CatalogRoutingModule, MovieGridModule],
  exports: [MovieCatalogComponent,GenreCatalogComponent],
})
export class CatalogModule {}
