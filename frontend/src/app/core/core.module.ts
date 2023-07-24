import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderDirective } from './header/header.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent,HeaderDirective]
})
export class CoreModule { }
