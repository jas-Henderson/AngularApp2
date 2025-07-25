import { Directive, ElementRef, HostListener, Input } from '@angular/core'; // Import necessary Angular core directives and services

@Directive({
    selector: '[appHighlight]',
    standalone: false
})
export class HighlightDirective { // Class definition for the Highlight directive
  @Input() appHighlight = '';

  constructor(private el: ElementRef) {} // Constructor to inject the ElementRef service, which gives access to the host element

  @HostListener('mouseenter') onMouseEnter() { // Listen for mouse enter events on the host element
    this.highlight(this.appHighlight || 'lightblue');
  }

  @HostListener('mouseleave') onMouseLeave() { // Listen for mouse leave events on the host element
    this.highlight('');
  }

  private highlight(color: string) { // Method to apply the highlight color to the host element
    this.el.nativeElement.style.backgroundColor = color;
  }
}