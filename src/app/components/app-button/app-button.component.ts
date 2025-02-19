import { Component, Input } from '@angular/core';

type ButtonSize = 'small' | 'medium';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'AppButton',
  standalone: true,
  imports: [],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.css'
})
export class AppButtonComponent {
	@Input() size: ButtonSize = 'small';
	@Input() type: ButtonType = 'button';
	@Input() wide: boolean = false;
}
