import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';

export type SelectedViewButton = "account" | "password" | "links";

@Component({
  selector: 'app-user-tabs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-tabs.component.html',
  styleUrl: './user-tabs.component.css'
})
export class UserTabsComponent {
  @Input() selectedButton: SelectedViewButton = "account";

  private readonly cookieHandler: CookieHandler;

  constructor(private router: Router, private cookieService: CookieService) {
    this.cookieHandler = new CookieHandler(cookieService);
  }

  async logOut() {
    await this.deleteLoginCookies();
    await this.router.navigate(['/']);
  }

  private deleteLoginCookies(retries = 3, delayMs = 100): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cookieHandler.deleteLoginCookies();
      const attempt = (remainingRetries: number) => {
        try {
          if (this.cookieHandler.userCookiesExist()) throw new Error("User cookies could not be deleted.");
          resolve();
        } catch (error) {
          if (remainingRetries > 0) {
            setTimeout(() => {
              attempt(remainingRetries - 1);
            }, delayMs);
          } else {
            reject(error);
          }
        }
      };

      attempt(retries);
    });
  }

  getSelected(view: SelectedViewButton) {
    return this.selectedButton === view ? "selected-view" : "";
  }
}
