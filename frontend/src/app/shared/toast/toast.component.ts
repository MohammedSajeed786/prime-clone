import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  toast: Toast = {
    message: '',
    type: '',
    showToast: false,
  };

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToast().subscribe({
      next: (toast) => (this.toast = toast),
    });
  }
}
