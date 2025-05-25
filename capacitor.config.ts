import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
	appId: 'es.ulpgc.dollyshare',
	appName: 'Dollyshare',
	webDir: 'www',
	server: {
		hostname: "localhost"
	},
	plugins: {
		Filesystem: {},
		Share: {},
		Keyboard: {
			resize: KeyboardResize.Body,
			style: KeyboardStyle.Dark
		},
		CapacitorCookies: {
			enabled: true
		},
		CapacitorHttp: {
			enabled: true
		}
	},
	ios: {
		limitsNavigationsToAppBoundDomains: true
	}
};

export default config;
