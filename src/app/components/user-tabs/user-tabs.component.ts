import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';

export type SelectedViewButton = "account" | "password" | "links";

@Component({
  selector: 'app-user-tabs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-tabs.component.html',
  styleUrl: './user-tabs.component.css',
  providers: [CookieService]
})
export class UserTabsComponent {
  @Input() selectedButton: SelectedViewButton = "account";

  private readonly router = inject(Router)
  private readonly cookieHandler = inject(CookieHandler);

  async logOut() {
    await this.cookieHandler.deleteLoginCookies();
    await this.router.navigate(['/']);
  }

  getSelected(view: SelectedViewButton) {
    return this.selectedButton === view ? "selected-view" : "";
  }
}
