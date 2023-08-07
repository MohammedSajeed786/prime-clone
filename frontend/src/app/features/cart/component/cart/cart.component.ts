import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/shared/interfaces/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart$!: Observable<CartItem[]>;
  actualPrice = 0;
  discount = 0;
  total=0;

  constructor(private store: Store<{ cart: CartItem[] }>) {
    this.cart$ = store.select('cart');
  }
  ngOnInit() {
    this.cart$.subscribe({
      next: (cart) => {
        console.log('hello');
        this.calculateTotal(cart);
      },
    });
  }
  calculateActualPrice(cart: CartItem[]) {
    this.actualPrice = 0;
    cart.forEach((cartItem) => (this.actualPrice += cartItem.movie.price));
  }

  calculateDiscount() {
    if (this.actualPrice > 5 && this.actualPrice < 10) this.discount = 1;
    else if (this.actualPrice > 10 && this.actualPrice < 15) this.discount = 3;
    else if (this.actualPrice > 15 && this.actualPrice < 20) this.discount = 5;
    else this.discount = 7;
  }
  calculateTotal(cart: CartItem[]) {
    this.calculateActualPrice(cart);
    this.calculateDiscount();
    this.total=this.actualPrice-this.discount
  }
}
