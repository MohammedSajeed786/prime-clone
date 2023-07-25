import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: Toast = {
    message: '',
    type: '',
    showToast: false,
  };

  toastSubscription!: Subscription;

  constructor(private toastService: ToastService) {}
  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // console.log('inside ngOnInit');
    this.toastService.getToast().subscribe({
      next: (toast) => {
        // console.log('next');
        this.toast = toast;
      },
    });
  }
}
