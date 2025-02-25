import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoComponent } from "../../../components/logo/logo.component";
import { SelectedViewButton, UserTabsComponent } from "../../../components/user-tabs/user-tabs.component";
import { UserActiveLinksComponent } from "../active-links/active-links.component";
import { UserAccountComponent } from "../account/account.component";
import { UserChangePasswordComponent } from "../change-password/change-password.component";

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [LogoComponent, UserTabsComponent, UserActiveLinksComponent, UserAccountComponent, UserChangePasswordComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  constructor(private route: ActivatedRoute) { }

  getRoute(): string {
    return this.route.snapshot.url[1].path;
  }

  getSelectedButton(): SelectedViewButton {
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
