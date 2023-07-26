import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { LandingPageModule } from './features/landing-page/landing-page.module';
import { ToastModule } from './shared/toast/toast.module';
import { JwtInterceptorService } from './core/services/jwt-interceptor/jwt-interceptor.service';
import { MovieCatalogModule } from './features/movie-catalog/movie-catalog.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './features/login/login.module';
import { RegisterModule } from './features/register/register.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    // LandingPageModule,
    ToastModule,
    // MovieCatalogModule,
    // LoginModule,
    // RegisterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
