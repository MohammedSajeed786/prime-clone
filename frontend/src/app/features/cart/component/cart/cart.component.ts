import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, subscribeOn } from 'rxjs';
import { CartItem } from 'src/app/shared/interfaces/CartItem';
import { OrderService } from '../../order.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var Razorpay: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart$!: Observable<CartItem[]>;
  actualPrice = 0;
  discount = 0;
  total = 0;
  cart!: CartItem[];
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{ cart: CartItem[] }>,
    private orderService: OrderService,
    private router: Router
  ) {
    this.cart$ = store.select('cart');
  }
  ngOnInit() {
    this.subscriptions.push(
      this.cart$.subscribe({
        next: (cart) => {
          this.cart = cart;
          this.calculateTotal(cart);
        },
      })
    );
  }
  calculateActualPrice(cart: CartItem[]) {
    this.actualPrice = 0;
    cart.forEach((cartItem) => (this.actualPrice += cartItem.movie.price));
  }

  calculateDiscount() {
    if (this.actualPrice > 5 && this.actualPrice < 10) this.discount = 1;
    else if (this.actualPrice > 10 && this.actualPrice < 15) this.discount = 3;
    else if (this.actualPrice > 15 && this.actualPrice < 20) this.discount = 5;
    else if (this.actualPrice > 20) this.discount = 7;
  }
  calculateTotal(cart: CartItem[]) {
    this.calculateActualPrice(cart);
    this.calculateDiscount();
    this.total = this.actualPrice - this.discount;
  }
  createOrder() {
    this.subscriptions.push(
      this.orderService.createOrder(this.total).subscribe({
        next: (order: any) => {
          this.initiatePayment(order);
        },
      })
    );
  }
  initiatePayment(order: any) {
    var options = {
      key: environment.raz_key_id, // Enter the Key ID generated from the Dashboard
      amount: order.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Movie Verse', //your business name
      description: 'Movie Versen',
      image: '../../../../assets/logo.png',
      order_id: order.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: (response: any) => {
        // console.log(response);
        this.subscriptions.push(
          this.orderService
            .completeOrder(
              this.cart,
              order.orderId,
              response.razorpay_payment_id
            )
            .subscribe({
              next: (res) => {
                // console.log(res);
                Swal.fire({
                  title: 'Payment Success!',
                  text: 'Please wait! You will be redirected to Vault',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });

                setTimeout(() => {
                  Swal.close();
                  this.router.navigate(['/vault']);
                }, 5000);
              },
            })
        );
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: '', //your customer's name
        email: '',
        contact: '', //Provide the customer's phone number for better conversion rates
      },
      theme: {
        color: '#00050d',
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', (response: any) => {
      Swal.fire({
        title: 'Payment Failed!',
        text: 'Please try again after some time',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription) subscription.unsubscribe();
    });
  }
}
