import { Component, inject } from '@angular/core';
import { CommonInputFieldComponent } from "../../../components/common-input-field/common-input-field.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseUserApiService } from '../../../services/firebase/firebase-user-api.service';

@Component({
  selector: 'view-user-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonInputFieldComponent, AppButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class UserChangePasswordComponent {
  changePasswordForm: FormGroup;
  showSuccess = false;
  showError = false;

  private readonly BACKEND_USER_API = inject(FirebaseUserApiService);

  constructor() {
    this.changePasswordForm = new FormBuilder().group({
      current: ['', [Validators.required, Validators.minLength(8)]],
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
    if (this.changePasswordForm.invalid) return;

    try {
      await this.BACKEND_USER_API.changePassword(this.getFormValue('current'), this.getFormValue('password'));
      this.changePasswordForm.reset();
      this.showSuccessMessage();
    } catch (e: any) {
      if (e.message.includes("auth/invalid-credential")) {
        this.showErrorMessage();
        console.warn("Wrong current password");
      }
    }
  }

  private getFormValue(name: string): string {
    return this.changePasswordForm.get(name)!.value;
  }

  private showErrorMessage() {
    this.showError = true;
    setTimeout(() => this.showError = false, 3000);
  }

  private showSuccessMessage() {
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 3000);
  }

  isTouched(name: string) {
    return this.changePasswordForm.get(name)?.touched!
  }

  isInvalid(name: string) {
    return this.changePasswordForm.get(name)?.invalid || false
  }

  getValueFromForm(name: string) {
    return this.changePasswordForm.get(name)?.value;
  }
}
