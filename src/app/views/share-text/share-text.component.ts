import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BACKEND_SHARE_TEXT_API } from '../../app.component';
import { Router } from '@angular/router';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';
import User from '../../models/user';

@Component({
  selector: 'view-share-text',
  standalone: true,
  imports: [
    LogoComponent,
    RouteButtonComponent,
    ReactiveFormsModule,
    AppButtonComponent
  ],
  templateUrl: './share-text.component.html',
  styleUrl: './share-text.component.css',
  providers: [CookieService]
})
export class ShareTextComponent {
  readonly TITLE_MAXLEN = 30;
  readonly BODY_MAXLEN = 2000;

  textUploadForm: FormGroup;

  private readonly router = inject(Router);
  private readonly cookieHandler = inject(CookieHandler);

  constructor() {
    this.textUploadForm = new FormBuilder().group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.TITLE_MAXLEN)]],
      body: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.BODY_MAXLEN)]]
    });
  }

  async onSubmit() {
    try {
      const upload = await BACKEND_SHARE_TEXT_API.createUpload(
        this.getValueFromForm('title'),
        this.getValueFromForm('body'),
        this.getUserIfLoggedIn()
      );

      await this.router.navigate(['/finish', upload.id], {
        queryParams: { uploadType: 'text' }
      });
    } catch (e) {
      console.error("Could not create upload: " + e);
    }
  }

  getValueFromForm(name: string): string {
    return this.textUploadForm.get(name)?.value;
  }

  isInvalid(name: string) {
    return this.textUploadForm.get(name)?.invalid || false;
  }

  getUserIfLoggedIn(): User | null {
    return this.cookieHandler.getUserCookies();
  }
}
