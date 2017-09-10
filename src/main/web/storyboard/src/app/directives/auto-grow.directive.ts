import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'textarea[auto-grow]'
})
export class AutoGrowDirective {
  private baseHeight: number;
  private element: ElementRef;

  @HostListener('input',['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  constructor(private elementRef: ElementRef){
    this.element = elementRef;
    this.baseHeight = null;
  }

  ngAfterContentChecked(): void{
    this.adjust();
  }
  adjust(): void{
    if(!this.baseHeight) {
      this.baseHeight = this.element.nativeElement.scrollHeight;
    }

    if(this.element.nativeElement.value && this.element.nativeElement.scrollHeight) {
      this.element.nativeElement.style.overflow = 'hidden';
      this.element.nativeElement.style.height = 'auto';
      this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
    }
  }
}
