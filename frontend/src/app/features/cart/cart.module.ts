import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './component/cart/cart.component';
import { CartItemComponent } from './component/cart-item/cart-item.component';
import { ShareModule } from 'ngx-sharebuttons';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';


@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    DialogModule
  ]
})
export class CartModule { }
