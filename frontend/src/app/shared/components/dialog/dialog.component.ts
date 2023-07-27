import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from '../../interfaces/Dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input() dialogText!: Dialog;
  @Output() okEvent: EventEmitter<null> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<null> = new EventEmitter();

  show = false;
  ngOnInit(): void {
    this.show = true;
  }
  okClicked() {
    this.show = false;
    this.okEvent.emit();
  }
  cancelClicked() {
    this.show = false;
    this.cancelEvent.emit();
  }
}
