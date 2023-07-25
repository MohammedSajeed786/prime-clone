import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-register',
  
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  show = false;
  registerForm!: FormGroup;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/;
  constructor(private fb: FormBuilder, private toastService: ToastService) { }

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
      confirmPassword:['',[Validators.required]],
      username:['',Validators.required],
      fullName:['',Validators.required]
    });
  }
  register(){}

}
