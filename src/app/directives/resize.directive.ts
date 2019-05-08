import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appResize]'
})
export class ResizeDirective implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement) {
    this.resize();
  }

  constructor(private element: ElementRef) { }

  ngOnInit() {
    setTimeout(() => this.resize(), 100);
  }

  resize() {
    const element = this.element.nativeElement.getElementsByClassName('native-textarea')[0];
    if (element) {
      const scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.element.nativeElement.style.height = (scrollHeight + 16) + 'px';
    }
  }

}
