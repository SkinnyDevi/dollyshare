import { Component } from '@angular/core';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonInputFieldComponent } from "../../components/common-input-field/common-input-field.component";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BACKEND_USER_API } from '../../app.component';
import { LoginValidatorHookComponent } from "../../components/login-validator-hook/login-validator-hook.component";

@Component({
  selector: 'view-register',
  standalone: true,
  imports: [
    AppButtonComponent,
    LogoComponent,
    CommonInputFieldComponent,
    ReactiveFormsModule,
    LoginValidatorHookComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeat_password: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeat_password')?.value;
    return password === repeatPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    await BACKEND_USER_API.createUser({
      username: this.getValueFromForm('username') as string,
      email: this.getValueFromForm('email') as string,
      password: this.getValueFromForm('password') as string,
      id: ''
    })

    this.router.navigate(['/register-successful'])
  }

  getValueFromForm(name: string) {
    return this.registerForm.get(name)?.value;
  }

  isTouched(name: string) {
    return this.registerForm.get(name)?.touched!
  }

  isInvalid(name: string) {
    return this.registerForm.get(name)?.invalid || false
  }
}
