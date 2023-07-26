import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

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
    private router: Router
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
    this.registerSubscription=this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.toastService.setToastData('done', 'Welcome buddy');
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        this.toastService.setToastData('warning', error.error.message);
      },
    });
  }
  ngOnDestroy(){
    this.registerSubscription.unsubscribe();
  }
}
