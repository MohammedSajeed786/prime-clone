import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Dialog } from 'src/app/shared/interfaces/Dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn: boolean = false;
  isLoggedInSubscription!: Subscription;
  showDialog=false;
  dialogText!:Dialog;

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.getIsLoggedIn$().subscribe({
      next: (val) => {
        // console.log('inside header ' + val);
        this.isLoggedIn = val;
      },
    });
  }
  logoutClicked() {
    this.dialogText={message:'are you sure you want to logout?',okText:'yes',cancelText:'no'}
    this.showDialog=true;
  }
  logout(){
    this.showDialog=false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }
}
