import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule } from '@angular/router';
import { LandingPageRoutingModule } from './landing-page-routing.module';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    LandingPageRoutingModule
  ],
  exports:[LandingPageComponent]
})
export class LandingPageModule { }
