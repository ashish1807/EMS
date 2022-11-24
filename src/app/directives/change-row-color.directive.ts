import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeRowColor]',
})
export class ChangeRowColorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseover')
  onMouseOver() {
    this.el.nativeElement.style.backgroundColor = '#cafad0';
  }

  @HostListener('mouseleave')
  onMouseOut() {
    this.el.nativeElement.style.backgroundColor = 'var(--bs-table-bg)';
  }
}
