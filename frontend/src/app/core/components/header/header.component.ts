import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  constructor(private authService: AuthService) {}
  isLoggedIn: boolean = false;
  isLoggedInSubscription!:Subscription
  ngOnInit(): void {
    this.isLoggedInSubscription=this.authService.getIsLoggedIn$().subscribe({
      next: (val) =>{ (this.isLoggedIn = val)},
    });
  }

  ngOnDestroy(){
    this.isLoggedInSubscription.unsubscribe();
  }
}
