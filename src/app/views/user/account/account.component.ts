import { Component, inject } from '@angular/core';
import { CommonInputFieldComponent } from "../../../components/common-input-field/common-input-field.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseUserApiService } from '../../../services/firebase/firebase-user-api.service';
import CookieHandler from '../../../services/cookies/cookies.service';

@Component({
  selector: 'view-user-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonInputFieldComponent, AppButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class UserAccountComponent {
  changeEmailForm: FormGroup;
  changeUsernameForm: FormGroup;
  showSuccess = false;

  private BACKEND_USER_API = inject(FirebaseUserApiService);
  private cookieHandler = inject(CookieHandler);

  constructor() {
    this.changeEmailForm = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.changeUsernameForm = new FormBuilder().group({
      username: ['', [Validators.required]]
    })
  }

  async onEmailSubmit() {
    if (this.changeEmailForm.invalid) return;

    try {
      let currentUser = this.cookieHandler.getUserCookies();
      if (currentUser === null) {
        console.error("Couldn't update user: user is 'null'");
        return;
      }

      currentUser.email = this.changeEmailForm.get('email')?.value;
      currentUser.modifiedAt = Date.now();

      // Update user
      await this.BACKEND_USER_API.updateUser(currentUser.id, currentUser);
      this.changeEmailForm.reset();
      this.showSuccessMessage();
    } catch (e: any) {
      console.log("Couldn't update the user:", e);
    }
  }

  async onUsernameSubmit() {
    if (this.changeUsernameForm.invalid) return;

    try {
      let currentUser = this.cookieHandler.getUserCookies();
      if (currentUser === null) {
        console.error("Couldn't update user: user is 'null'");
        return;
      }

      currentUser.username = this.changeUsernameForm.get('username')?.value;
      currentUser.modifiedAt = Date.now();

      // Update user
      await this.BACKEND_USER_API.updateUser(currentUser.id, currentUser);
      this.changeUsernameForm.reset();
      this.showSuccessMessage();
    } catch (e: any) {
      console.log("Couldn't update the user:", e);
    }
  }

  private showSuccessMessage() {
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 3000);
  }
}
