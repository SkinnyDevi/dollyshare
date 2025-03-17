import { Component, Input } from '@angular/core';
import NavbarVariant from './navbar-variant';
import { LoginButtonComponent } from "../app-button/login-button/login-button.component";
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { IconButtonComponent } from '../app-button/icon-button/icon-button.component';
import { RouteButtonComponent } from '../app-button/route-button/route-button.component';
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouteButtonComponent, LoginButtonComponent, IconButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly DEFAULT_VARIANT = NavbarVariant.GUEST;
  private readonly cookieHandler: CookieHandler;

  @Input() variant: NavbarVariant = this.DEFAULT_VARIANT;

  constructor(private router: Router, private route: ActivatedRoute, private cookieService: CookieService) {
    this.cookieHandler = new CookieHandler(cookieService);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.firstChild?.snapshot.data['navbarVariant'])
      )
      .subscribe(variant => {
        this.variant = variant || this.getNavbarVariant();
      });
  }

  getNavbarVariant() {
    if (this.cookieHandler.userCookiesExist()) return NavbarVariant.USER;
    return NavbarVariant.GUEST;
  }
}
