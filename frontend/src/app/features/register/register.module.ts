import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
