import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogoComponent } from "../../../components/logo/logo.component";
import { SelectedViewButton, UserTabsComponent } from "../../../components/user-tabs/user-tabs.component";
import { UserActiveLinksComponent } from "../active-links/active-links.component";
import { UserAccountComponent } from "../account/account.component";
import { UserChangePasswordComponent } from "../change-password/change-password.component";
import { ManageActiveLinkComponent } from "../manage-active-link/manage-active-link.component";
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../../services/cookies/cookies.service';

@Component({
  selector: 'view-user-layout',
  standalone: true,
  imports: [LogoComponent, UserTabsComponent, UserActiveLinksComponent, UserAccountComponent, UserChangePasswordComponent, ManageActiveLinkComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {
  private readonly cookieHandler: CookieHandler;

  constructor(private route: ActivatedRoute, private cookieService: CookieService) {
    this.cookieHandler = new CookieHandler(cookieService);
    console.log(this.cookieHandler.getUserCookies());
  }

  getRoute(): string {
    return this.route.snapshot.url[1].path;
  }

  getSelectedButton(): SelectedViewButton {
    if (this.getRoute().includes('manage-link')) return 'links';

    switch (this.getRoute()) {
      case 'active-links':
        return 'links';
      case 'change-password':
        return 'password';
      default:
        return 'account';
    }
  }
}
