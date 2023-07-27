import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderDirective } from './components/header/header.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../shared/components/dialog/dialog.module';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderDirective,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DialogModule
  ],
  exports:[HeaderComponent,HeaderDirective,FooterComponent]
})
export class CoreModule { }
