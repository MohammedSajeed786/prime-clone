import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  show = false;
  registerForm!: FormGroup;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/;
  registerSubscription!:Subscription;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email]],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.pattern(this.passwordRegex),
          Validators.required,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      fullName: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  register() {
    this.spinner.show();

    this.registerSubscription=this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.authService.setToken(res.token);
        this.authService.setisLoggedIn$(true);
        this.toastService.setToastData('done', 'Welcome buddy');
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        this.spinner.hide();
        this.toastService.setToastData('warning', error.error.message);
      },
    });
  }
  ngOnDestroy(){
    if(this.registerSubscription)this.registerSubscription.unsubscribe();
  }
}
