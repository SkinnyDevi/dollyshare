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
    this.cookieService.set(CookieTagNames.LOGGED_IN_USER, btoa(JSON.stringify(user)), { expires: 1 });
  }

  getUserCookies(): null | User {
    if (!this.cookieService.check(CookieTagNames.LOGGED_IN_USER)) return null;

    const rawJson = atob(this.cookieService.get(CookieTagNames.LOGGED_IN_USER));
    const jsonUser = JSON.parse(rawJson);
    return {
      username: jsonUser.username,
      password: jsonUser.password,
      email: jsonUser.email,
      id: jsonUser.id
    };
  }

  deleteLoginCookies() {
    if (!this.cookieService.check(CookieTagNames.LOGGED_IN_USER)) return;
    this.cookieService.delete(CookieTagNames.LOGGED_IN_USER);
  }
}
