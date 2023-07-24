import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show=false;
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,private toastService: ToastService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.email]],
      password:['',Validators.minLength(8)]
    })
  }
  login(){
   this.toastService.setToastData("error","hello world")
  }

}
