import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'es.ulpgc.dollyshare',
	appName: 'Dollyshare',
	webDir: 'www',
	server: {
		hostname: "localhost"
	},
	plugins: {
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
