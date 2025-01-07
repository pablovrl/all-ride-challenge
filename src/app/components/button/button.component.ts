import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: [
  ]
})
export class ButtonComponent {
  @Input() label: string = '';
  @Output() click: EventEmitter<any> = new EventEmitter()

  constructor() { }

  emitClick() {
    this.click.emit();
  }
}
