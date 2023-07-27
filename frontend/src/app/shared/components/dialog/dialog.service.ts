import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface Dialog {
  message: string;
  okText: string;
  cancelText: string;
}
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogText$: BehaviorSubject<Dialog> = new BehaviorSubject({
    message: '',
    okText: '',
    cancelText: '',
  });
  constructor() {}

  setDialogData(message: string, okText: string, cancelText: string) {
    let currentDialogText: Dialog = {
      message: message,
      okText: okText,
      cancelText: cancelText,
    };
    this.dialogText$.next(currentDialogText);
  }

  getDialogData(): Observable<Dialog> {
    return this.dialogText$.asObservable();
  }
}
