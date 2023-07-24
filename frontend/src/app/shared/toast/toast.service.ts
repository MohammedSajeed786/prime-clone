import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast{
  showToast:boolean,
  message:string,
  type:string
}
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast$ = new BehaviorSubject<Toast>({
    message: '',
    type: '',
    showToast: false,
  });

  constructor() {}

  getToast():Observable<Toast>{
    return this.toast$.asObservable();
  }

  setToast(val: Toast) {
    this.toast$.next(val);
  }

  hideToast() {
    this.setToast({
      showToast: false,
      message: '',
      type: '',
    });
  }

  setToastData(type: string, message: string) {
    this.setToast({
      showToast: true,
      message: message,
      type: type,
    });
    setTimeout(() => {
      // this.hideToast();
    }, 5000);
  }
}
