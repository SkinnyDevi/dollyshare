import { CookieService } from "ngx-cookie-service";
import User from "../../models/user";
import { inject, Injectable } from "@angular/core";

enum CookieTagNames {
	LOGGED_IN_USER = "logged-user"
}

@Injectable({
	providedIn: 'root'
})
export default class CookieHandler {
	private readonly cookieService = inject(CookieService);

	createLoginCookies(user: User) {
		this.cookieService.set(
			CookieTagNames.LOGGED_IN_USER,
			btoa(JSON.stringify(user)),
			{
				expires: 1,
				path: "/"
			}
		);
	}

	userCookiesExist() {
		return this.cookieService.check(CookieTagNames.LOGGED_IN_USER);
	}

	getUserCookies(): null | User {
		if (!this.userCookiesExist()) return null;

		const rawJson = atob(this.cookieService.get(CookieTagNames.LOGGED_IN_USER));
		const jsonUser = JSON.parse(rawJson);
		return {
			username: jsonUser.username,
			email: jsonUser.email,
			id: jsonUser.id
		};
	}

	async deleteLoginCookies() {
		await this.deleteCookies(
			() => this.cookieService.delete(CookieTagNames.LOGGED_IN_USER, "/"),
			() => this.userCookiesExist(),
			"User cookies could not be deleted"
		);
	}

	private deleteCookies(
		delete_fn: () => void,
		check_fn: () => boolean,
		error_msg = "Could not delete cookies.",
		retries = 3,
		delayMs = 100
	): Promise<void> {
		return new Promise((resolve, reject) => {
			delete_fn();
			const attempt = (remainingRetries: number) => {
				try {
					if (check_fn()) throw new Error(error_msg);
					resolve();
				} catch (error) {
					if (remainingRetries > 0) {
						setTimeout(() => {
							attempt(remainingRetries - 1);
						}, delayMs);
					} else {
						try {
							this.fallbackDeleteLoggedUserCookie();
							console.warn("Logged out by fallback method.");
							resolve();
						} catch (error) {
							reject(error);
						}
					}
				}
			};

			attempt(retries);
		});
	}

	private fallbackDeleteLoggedUserCookie(): void {
		const cookies = document.cookie.split(';');

		for (let cookie of cookies) {
			const [name] = cookie.split('=').map(part => part.trim());
			if (name === CookieTagNames.LOGGED_IN_USER) {
				document.cookie = 'logged-user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
				break;
			}
		}
	}
}
