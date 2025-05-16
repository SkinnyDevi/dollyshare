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
	isNativePhone: boolean;

	constructor(private platform: Platform) {
		this.isNativePhone = this.platform.is('ios') || this.platform.is("android");
	}
}
