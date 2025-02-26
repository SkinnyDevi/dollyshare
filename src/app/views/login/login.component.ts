import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { LoginInputComponent } from "../../components/login-input/login-input.component";
import { Router } from '@angular/router';
import { AppButtonComponent } from "../../components/app-button/app-button.component";

@Component({
  selector: 'view-login',
  standalone: true,
  imports: [LogoComponent, LoginInputComponent, AppButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) { }

  onSubmit() {
    this.router.navigate(['/user/account'])
  }
}
