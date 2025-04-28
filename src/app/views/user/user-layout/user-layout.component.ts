import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogoComponent } from "../../../components/logo/logo.component";
import { SelectedViewButton, UserTabsComponent } from "../../../components/user-tabs/user-tabs.component";
import { UserActiveLinksComponent } from "../active-links/active-links.component";
import { UserAccountComponent } from "../account/account.component";
import { UserChangePasswordComponent } from "../change-password/change-password.component";
import { ManageActiveLinkComponent } from "../manage-active-link/manage-active-link.component";
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../../services/cookies/cookies.service';
import { LoginValidatorHookComponent } from "../../../components/login-validator-hook/login-validator-hook.component";
import { FirebaseUserApiService } from '../../../services/firebase/firebase-user-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'view-user-layout',
  imports: [LogoComponent, UserTabsComponent, UserActiveLinksComponent, UserAccountComponent, UserChangePasswordComponent, ManageActiveLinkComponent, LoginValidatorHookComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
  providers: [CookieService]
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly cookieHandler = inject(CookieHandler);
  private readonly BACKEND_USER_API = inject(FirebaseUserApiService);
  private userSubscription: Subscription | null = null;

  ngOnInit(): void {
    const localUser = this.cookieHandler.getUserCookies();
    if (localUser === null) return;
    this.userSubscription = this.BACKEND_USER_API.getUserRealtime(localUser.id).subscribe((user) => {
      this.cookieHandler.createLoginCookies(user)
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
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

  getUsername() {
    const user = this.cookieHandler.getUserCookies();
    if (user === null) return "user";
    return user.username;
  }
}
