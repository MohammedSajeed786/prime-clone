import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { CoreModule } from './core/core.module';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LandingPageModule } from './features/landing-page/landing-page.module';
import { LoginModule } from './features/login/login.module';
import { ToastComponent } from './shared/toast/toast.component';
import { ToastModule } from './shared/toast/toast.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    LandingPageModule,
    LoginModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
