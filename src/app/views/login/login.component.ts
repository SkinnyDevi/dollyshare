import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { LoginInputComponent } from "../../components/login-input/login-input.component";
import { Router } from '@angular/router';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BACKEND_USER_API } from '../../app.component';
import CookieHandler from '../../services/cookies/cookies.service';
import { LoginValidatorHookComponent } from "../../components/login-validator-hook/login-validator-hook.component";
import {NgIf} from '@angular/common';

@Component({
  selector: 'view-login',
  standalone: true,
  imports: [LogoComponent, LoginInputComponent, AppButtonComponent, ReactiveFormsModule, LoginValidatorHookComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [CookieService]
})
export class LoginComponent {
  loginForm: FormGroup;
  private readonly cookieHandler: CookieHandler;
  errorMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.cookieHandler = new CookieHandler(cookieService);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  async onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.invalid) return;

    try {
      const user = await BACKEND_USER_API.login(
        this.getValueFromForm('email'),
        this.getValueFromForm('password')
      );

      this.cookieHandler.createLoginCookies(user);
      await this.router.navigate(['/user/account'])
    } catch (error) {
      this.errorMessage = 'Account not found, incorrect email or password';
    }
  }

  private getValueFromForm(name: string): string {
    return this.loginForm.get(name)?.value;
  }
}
