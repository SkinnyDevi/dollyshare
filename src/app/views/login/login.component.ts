import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { LoginInputComponent } from "../../components/login-input/login-input.component";
import { Router } from '@angular/router';

@Component({
  selector: 'view-login',
  standalone: true,
  imports: [LogoComponent, AppButtonComponent, LoginInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) { }

  onSubmit() {
    this.router.navigate(['/user'])
  }
}
