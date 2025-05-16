import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { Firestore } from '@angular/fire/firestore';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		NavbarComponent,
		FooterComponent,
		IonRouterOutlet,
		IonFooter,
		IonContent,
		IonHeader,
		IonApp
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	private firestore = inject(Firestore);

	title = 'dollyshare';
}
