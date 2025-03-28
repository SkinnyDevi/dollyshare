import { CookieService } from "ngx-cookie-service";
import User from "../../models/user";

enum CookieTagNames {
  LOGGED_IN_USER = "logged-user"
}

export default class CookieHandler {
  private readonly cookieService: CookieService;

  constructor(cookieService: CookieService) {
    this.cookieService = cookieService;
  }

  createLoginCookies(user: User) {
    this.cookieService.set(
      CookieTagNames.LOGGED_IN_USER,
      btoa(JSON.stringify(user)),
      {
        expires: 1,
        secure: true
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
      password: jsonUser.password,
      email: jsonUser.email,
      id: jsonUser.id
    };
  }

  async deleteLoginCookies() {
    await this.deleteCookies(
      () => this.cookieService.delete(CookieTagNames.LOGGED_IN_USER),
      () => this.userCookiesExist(),
      "User cookies could not be deleted"
    );
  }

  private deleteCookies(
    delete_fn: () => void,
    check_fn: () => boolean,
    error_msg = "Could not delete cookies.",
    retries = 10,
    delayMs = 250
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
      if (name === 'logged-user') {
        document.cookie = 'logged-user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        break;
      }
    }
  }
}
