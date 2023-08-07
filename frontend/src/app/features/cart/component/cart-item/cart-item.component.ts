import { Component, Input, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/shared/interfaces/CartItem';
import { CartService } from '../../cart.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnDestroy{
  removeClicked = false;
  removeSubscription!: Subscription;
  @Input() cartItem!: CartItem;

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  removeFromCart() {
    this.removeSubscription = this.cartService
      .removeFromCart(this.cartItem.cartItemId)
      .subscribe({
        next: (res) => {
          // console.log("inside next")
          this.toastService.setToastData('done', res.message);
        },
      });
  }

  ngOnDestroy() {
    // console.log("inside on destroy")
    if(this.removeSubscription)
    this.removeSubscription.unsubscribe();
  }
}
