import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { CartItem } from 'src/app/shared/interfaces/CartItem';
import {
  addToCart,
  createCart,
  removeFromCart,
} from 'src/app/store/action/cart.action';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/interfaces/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUrl = environment.apiUrl + 'cart/';
  cart$!: Observable<CartItem[]>;

  constructor(
    private http: HttpClient,
    private store: Store<{ cart: CartItem[] }>
  ) {
    this.cart$ = store.select('cart');
  }

  isCartLoaded = false;

  getCart() {
    if (!this.isCartLoaded) {
      this.http
        .get<Response>(this.cartUrl + 'all')
        .pipe(
          tap((res) => {
            this.isCartLoaded = true;
            // console.log('inside get cart');
            // console.log(res);
            this.store.dispatch(createCart({ userCart: res.data.cart }));
          })
        )
        .subscribe();
    }
  }

  addToCart(movieId: number): Observable<Response> {
    return this.http.post<Response>(this.cartUrl + 'add/' + movieId, {}).pipe(
      tap((res) => {
        this.store.dispatch(
          addToCart({
            cartItem: res.data,
          })
        );
      })
    );
  }

  removeFromCart(cartItemId: number): Observable<Response> {
    return this.http
      .delete<Response>(this.cartUrl + 'remove/' + cartItemId)
      .pipe(
        tap((res) => {
          console.log("inside tap")
          this.store.dispatch(removeFromCart({ cartItemId: cartItemId }));
        })
      );
  }

  isPresentInCart(movieId: number) {
    return this.cart$.pipe(
      map((cart) => {
        const cartItem = cart.find((cartItem: CartItem) => {
          // console.log(cartItem);
          return cartItem.movie.movieId == movieId;
        });
        // console.log(cartItem);
        return cartItem ? cartItem.cartItemId : null;
      })
    );
  }
}
