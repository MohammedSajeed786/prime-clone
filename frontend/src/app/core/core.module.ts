import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderDirective } from './header/header.directive';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderDirective,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent,HeaderDirective,FooterComponent]
})
export class CoreModule { }
