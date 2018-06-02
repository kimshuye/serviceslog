import { Directive, Output, HostListener, EventEmitter , Renderer, ElementRef, asNativeElements } from '@angular/core';

@Directive({ selector: '[mouseWheel]' })
export class MouseWheelDirective {

  constructor(
    private renderer: Renderer,
    private el: ElementRef
  ){}

  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any,el: ElementRef) {
    this.mouseWheelFunc(event,el);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any,el: ElementRef) {
    this.mouseWheelFunc(event,el);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any,el: ElementRef) {
    this.mouseWheelFunc(event,el);
  }

  mouseWheelFunc(event: any,el: ElementRef) {
    var event = window.event || event; // old IE support
    el.nativeElement; // this state action mousewheel

    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if(delta > 0) {
      this.mouseWheelUp.emit(event);
      
    } else if(delta < 0) {
      this.mouseWheelDown.emit(event);
      
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if(event.preventDefault) {
      event.preventDefault();
    }
  }

}