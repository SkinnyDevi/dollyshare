import { Component, Input } from '@angular/core';
import NavbarVariant from './navbar-variant';
import { LoginButtonComponent } from "../app-button/login-button/login-button.component";
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { IconButtonComponent } from '../app-button/icon-button/icon-button.component';
import { RouteButtonComponent } from '../app-button/route-button/route-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouteButtonComponent, LoginButtonComponent, IconButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private DEFAULT_VARIANT = NavbarVariant.GUEST;

  @Input() variant: NavbarVariant = this.DEFAULT_VARIANT;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.firstChild?.snapshot.data['navbarVariant'] || this.DEFAULT_VARIANT)
      )
      .subscribe(variant => {
        this.variant = variant;
      });
  }
}
