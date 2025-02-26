import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-input-field',
  standalone: true,
  imports: [],
  templateUrl: './common-input-field.component.html',
  styleUrl: './common-input-field.component.css'
})
export class CommonInputFieldComponent {
  @Input() type: HTMLInputElement['type'] = "text";
  @Input() placeholder = "";
  @Input() label = "Common Input Label";

  labelToInputName() {
    return this.label.toLowerCase().replaceAll(' ', '_');
  }
}
