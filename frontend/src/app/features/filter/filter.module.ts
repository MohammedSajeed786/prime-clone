import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterComponent } from './filter.component';
import { LucideAngularModule,ChevronDown } from 'lucide-angular';


@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ChevronDown})

  ],
  exports:[FilterComponent]
})
export class FilterModule { }
