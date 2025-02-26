import { Component, ElementRef, Input } from '@angular/core';
import { IconSelectorComponent } from "../icons/icon-selector/icon-selector.component";

@Component({
  selector: 'app-common-input-field',
  standalone: true,
  imports: [IconSelectorComponent],
  templateUrl: './common-input-field.component.html',
  styleUrl: './common-input-field.component.css'
})
export class CommonInputFieldComponent {
  @Input() type: HTMLInputElement['type'] = "text";
  @Input() placeholder = "";
  @Input() label = "Common Input Label";

  revealPassword = false;

  constructor(private elRef: ElementRef) { }

  labelToInputName() {
    return this.label.toLowerCase().replaceAll(' ', '_');
  }

  toggleRevealPassword() {
    this.revealPassword = !this.revealPassword;
    const rootElement = this.elRef.nativeElement as HTMLDivElement;
    const inputElement = rootElement.querySelector('input')!;
    inputElement.type = this.revealPassword ? "text" : "password";
  }
}
