import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ToastModule } from './shared/components/toast/toast.module';
import { JwtInterceptorService } from './core/services/jwt-interceptor/jwt-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/reducer/cart.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ToastModule,
    NgxSpinnerModule,
    StoreModule.forRoot({
      cart: cartReducer,
    }),
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
