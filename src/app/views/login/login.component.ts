import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { LoginInputComponent } from "../../components/login-input/login-input.component";
import { Router } from '@angular/router';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BACKEND_USER_API } from '../../app.component';

@Component({
  selector: 'view-login',
  standalone: true,
  imports: [LogoComponent, LoginInputComponent, AppButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const user = await BACKEND_USER_API.login(
      this.getValueFromForm('email'),
      this.getValueFromForm('password')
    );

    this.router.navigate(['/user/account'])
  }

  private getValueFromForm(name: string): string {
    return this.loginForm.get(name)?.value;
  }
}
