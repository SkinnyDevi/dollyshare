import { Component, Input } from '@angular/core';

export type ButtonSize = 'small' | 'medium';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.css'
})
export class AppButtonComponent {
  @Input() size: ButtonSize = 'small';
  @Input() type: HTMLButtonElement['type'] = 'button';
  @Input() wide: boolean = false;
}
