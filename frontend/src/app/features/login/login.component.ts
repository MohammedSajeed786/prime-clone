import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, DoCheck {
  show = false;
  loginForm!: FormGroup;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/;

  constructor(private fb: FormBuilder, private toastService: ToastService) {}
  ngDoCheck(): void {
    console.log(this.loginForm);
  }

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
  login() {}
}
