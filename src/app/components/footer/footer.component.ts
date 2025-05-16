import { Component } from '@angular/core';
import { Platform } from '@ionic/angular/common';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.css'
})
export class FooterComponent {
	isIos: boolean;

	constructor(private platform: Platform) {
		this.isIos = this.platform.is('ios');
	}
}
