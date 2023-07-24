import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeader]',
})
export class HeaderDirective {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll')
  scrollYEventListener() {
    if (window.scrollY > 10) {
      this.el.nativeElement.style.top = '10px';
      this.el.nativeElement.style.backgroundColor= 'transparent';
      

    }
    else{
      this.el.nativeElement.style.top = '0px';
      this.el.nativeElement.style.backgroundColor= 'var(--black-background)';
      
    }
  }
}
