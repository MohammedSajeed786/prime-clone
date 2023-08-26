import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotForm_email!: FormGroup;
  forgotForm_otp!: FormGroup;
  forgotForm_password!: FormGroup;
  formToShow = {
    email: true,
    otp: false,
    password: false,
  };
  show = false;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/;
  subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private fpService: ForgotPasswordService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgotForm_email = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }
  sendOtp() {
    this.subscriptions.push(
      this.fpService.sendOtp(this.forgotForm_email.value.email).subscribe({
        next: (res) => {
          this.toastService.setToastData('done', res);
          this.forgotForm_otp = this.fb.group({
            otp: [
              '',
              [
                Validators.required,
                Validators.min(1000),
                Validators.max(9999),
              ],
            ],
          });

          this.formToShow = {
            ...this.formToShow,
            email: false,
            otp: true,
          };
        },
        error: (err) => {
          this.toastService.setToastData(
            'error',
            JSON.parse(err.error).message
          );
        },
      })
    );
  }

  verifyOtp() {
    this.subscriptions.push(
      this.fpService
        .verifyOtp(
          this.forgotForm_email.value.email,
          this.forgotForm_otp.value.otp
        )
        .subscribe({
          next: (res) => {
            this.toastService.setToastData('done', res);
            this.forgotForm_password = this.fb.group({
              password: [
                '',
                [
                  Validators.minLength(8),
                  Validators.pattern(this.passwordRegex),
                  Validators.required,
                ],
              ],
              confirmPassword: ['', [Validators.required]],
            });
            this.formToShow = {
              ...this.formToShow,
              otp: false,
              password: true,
            };
          },
          error: (err) =>
            this.toastService.setToastData(
              'error',
              JSON.parse(err.error).message
            ),
        })
    );
  }

  updatePassword() {
    this.subscriptions.push(
      this.fpService
        .updatePassword(
          this.forgotForm_email.value.email,
          this.forgotForm_password.value.password
        )
        .subscribe({
          next: (res) => {
            this.toastService.setToastData('done', res);
            this.router.navigate(['/login']);
          },
          error: (err) =>
            this.toastService.setToastData(
              'error',
              JSON.parse(err.error).message
            ),
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription) subscription.unsubscribe();
    });
  }
}
