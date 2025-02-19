import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

type ButtonSize = 'small' | 'medium';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.css'
})
export class AppButtonComponent {
  @Input() size: ButtonSize = 'small';
  @Input() type: ButtonType = 'button';
  @Input() wide: boolean = false;
  @Input() routerLink: string = '';
}
