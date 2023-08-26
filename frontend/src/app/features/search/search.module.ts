import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { CatalogModule } from '../catalog/catalog.module';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule, CatalogModule, FilterModule],
})
export class SearchModule {}
