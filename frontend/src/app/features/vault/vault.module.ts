import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaultRoutingModule } from './vault-routing.module';
import { VaultComponent } from './components/vault/vault.component';
import { VaultItemComponent } from './components/vault-item/vault-item.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VaultComponent,
    VaultItemComponent
  ],
  imports: [
    CommonModule,
    VaultRoutingModule,
    SharedModule
  ]
})
export class VaultModule { }
