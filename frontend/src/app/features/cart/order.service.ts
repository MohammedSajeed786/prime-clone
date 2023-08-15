import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/interfaces/Response';
import { CartItem } from 'src/app/shared/interfaces/CartItem';
import { CartService } from './cart.service';
import { VaultItem } from 'src/app/shared/interfaces/VaultItem';
import { VaultService } from '../vault/vault.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderUrl = environment.apiUrl + 'order/';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private vaultService: VaultService
  ) {}

  createOrder(price: number) {
    return this.http
      .post<Response>(this.orderUrl + 'create/' + price * 83, {})
      .pipe(map((res) => res.data));
  }

  completeOrder(cart: CartItem[], orderId: string, paymentId: string) {
    let cartItemIdList: number[] = [],
      movieIdList: number[] = [];

    cart.forEach((cartItem: CartItem) => {
      cartItemIdList.push(cartItem.cartItemId);
      movieIdList.push(cartItem.movie.movieId);
    });

    return this.http
      .post<Response>(this.orderUrl + 'complete', {
        orderId: orderId,
        paymentId: paymentId,
        cartItemIdList: cartItemIdList,
        movieIdList: movieIdList,
      })
      .pipe(
        map((res) => res.data),
        tap((data: VaultItem[]) => {
          this.cartService.clearCart();
          this.vaultService.addToVault(data);
        })
      );
  }
}
