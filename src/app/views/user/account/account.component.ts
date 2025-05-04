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
  accountUpdateForm: FormGroup;
  showSuccess = false;

  private BACKEND_USER_API = inject(FirebaseUserApiService);
  private cookieHandler = inject(CookieHandler);

  constructor() {
    this.accountUpdateForm = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    })
  }

  async onSubmit() {
    if (this.accountUpdateForm.invalid) return;

    try {
      let currentUser = this.cookieHandler.getUserCookies();
      if (currentUser === null) {
        console.error("Couldn't update user: user is 'null'");
        return;
      }

      currentUser.username = this.getFormValue('username');
      currentUser.email = this.getFormValue('email');
      currentUser.modifiedAt = Date.now();

      // Update user
      const newUser = await this.BACKEND_USER_API.updateUser(currentUser.id, currentUser);
      this.accountUpdateForm.reset();
      this.showSuccessMessage();
    } catch (e: any) {
      console.log("Couldn't update the user:", e);
    }
  }

  private showSuccessMessage() {
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 3000);
  }

  private getFormValue(name: string): string {
    return this.accountUpdateForm.get(name)?.value;
  }
}
