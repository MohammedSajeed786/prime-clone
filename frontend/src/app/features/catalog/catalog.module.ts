import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { MovieCatalogComponent } from './components/movie-catalog/movie-catalog.component';
import { GenreCatalogComponent } from './components/genre-catalog/genre-catalog.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  declarations: [MovieCatalogComponent,GenreCatalogComponent,MovieItemComponent,MovieGridComponent],
  imports: [CommonModule, CatalogRoutingModule,SharedModule,FilterModule],
  exports: [MovieGridComponent,MovieItemComponent],
})
export class CatalogModule {}
