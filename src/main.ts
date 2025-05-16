import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, indexedDBLocalPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideZoneChangeDetection } from '@angular/core';

function getFBAuth(firebaseApp: FirebaseApp) {
	if (Capacitor.isNativePlatform()) {
		return initializeAuth(firebaseApp, {
			persistence: indexedDBLocalPersistence
		})
	} else {
		return getAuth();
	}
}

const fbApp = initializeApp(environment.firebaseConfig)

bootstrapApplication(AppComponent, {
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		provideIonicAngular(),
		provideRouter(routes, withPreloading(PreloadAllModules)),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideFirebaseApp(() => fbApp),
		provideAuth(() => getFBAuth(fbApp)),
		provideFirestore(() => getFirestore())
	],
});
