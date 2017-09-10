import {Directive, ElementRef, Input, Output, EventEmitter, OnChanges} from "@angular/core";

@Directive({
  selector: '[contentEditableModel]',
  host: {
    '(blur)': 'onEdit()',
    '(keyup)': 'onEdit()'
  }
})

export class ContentEditableModelDirective implements OnChanges {
  @Input('contentEditableModel') model: any;
  @Output('contentEditableModelChange') update = new EventEmitter();
  private isPlaceholder: boolean;
  private placeholderText: string;

  constructor(
    private elementRef: ElementRef
  ) {
    this.isPlaceholder = true;
    this.placeholderText = "Place holder";
  }

  ngOnChanges(changes) {
    if (changes.model.isFirstChange())
      this.refreshView();
  }

  onEdit() {
    let value = this.elementRef.nativeElement.innerText;
    this.update.emit(value);
  }

  private refreshView() {
    this.elementRef.nativeElement.textContent = this.model;
  }
}
