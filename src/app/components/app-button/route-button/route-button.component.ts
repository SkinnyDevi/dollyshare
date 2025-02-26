import { Component, Input } from '@angular/core';
import { ButtonSize, ButtonType } from '../app-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-route-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './route-button.component.html',
  styles: `@import "../app-button.component.css";`
})
export class RouteButtonComponent {
  @Input() size: ButtonSize = 'small';
  @Input() type: ButtonType = 'button';
  @Input() wide: boolean = false;
  @Input() routerLink: string = '';
}
