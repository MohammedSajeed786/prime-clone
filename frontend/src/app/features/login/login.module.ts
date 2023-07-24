import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'src/app/shared/toast/toast.module';




@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule
    
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
