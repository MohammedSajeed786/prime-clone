import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthResponse, AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit,OnDestroy {
  show = false;
  loginForm!: FormGroup;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/;
  loginSubscription!:Subscription;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.pattern(this.passwordRegex),
          Validators.required,
        ],
      ],
    });
  }
  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: AuthResponse) => {
        this.authService.setToken(res.token);
        this.toastService.setToastData('done', 'Welcome back buddy');
        this.router.navigate(['/catalog']);
      },
      error: (error) => {

        this.toastService.setToastData('warning', error.error.message);
      },
    });
  }
  ngOnDestroy(){
    this.loginSubscription.unsubscribe();
  }
}
