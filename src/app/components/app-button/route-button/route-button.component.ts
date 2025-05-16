import { Component, Input } from '@angular/core';
import { ButtonSize } from '../app-button.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-route-button',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './route-button.component.html',
	styleUrl: "./route-button.component.css",
})
export class RouteButtonComponent {
	@Input() size: ButtonSize = 'small';
	@Input() type: HTMLButtonElement['type'] = 'button';
	@Input() wide: boolean = false;
	@Input() routerLink: string = '';
}
