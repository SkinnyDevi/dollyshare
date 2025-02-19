import { Component, Input } from '@angular/core';
import NavbarVariant from './navbar-variant';
import { AppButtonComponent } from "../app-button/app-button.component";
import { LoginButtonComponent } from "../app-button/login-button/login-button.component";

@Component({
  selector: 'AppNavbar',
  standalone: true,
  imports: [AppButtonComponent, LoginButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
	@Input() variant: NavbarVariant = NavbarVariant.GUEST;
}