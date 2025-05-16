import { Component, inject } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonInputFieldComponent } from "../../components/common-input-field/common-input-field.component";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginValidatorHookComponent } from "../../components/login-validator-hook/login-validator-hook.component";
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';
import { FirebaseUserApiService } from '../../services/firebase/firebase-user-api.service';

@Component({
	selector: 'view-register',
	standalone: true,
	imports: [
		AppButtonComponent,
		LogoComponent,
		CommonInputFieldComponent,
		ReactiveFormsModule,
		LoginValidatorHookComponent,
		IonContent
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
	providers: [CookieService]
})
export class RegisterComponent {
	registerForm: FormGroup;

	private readonly router = inject(Router);
	private readonly cookieHandler = inject(CookieHandler);
	private readonly BACKEND_USER_API = inject(FirebaseUserApiService);

	constructor() {
		this.registerForm = new FormBuilder().group({
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

		try {
			const createdUser = await this.BACKEND_USER_API.createUser({
				username: this.getValueFromForm('username') as string,
				email: this.getValueFromForm('email') as string,
				password: this.getValueFromForm('password') as string,
				id: ''
			});

			this.cookieHandler.createLoginCookies(createdUser);

			await this.router.navigate(['/register-successful'])
		} catch (e) {
			console.error("Could not create user: " + e);
		}
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
