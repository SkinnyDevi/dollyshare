import { Component, inject } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import formatFileSize from '../../components/fileSizeFormatter';
import User from '../../models/user';
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';
import { ScreenDetectorService } from '../../services/screenDetector/screenDetector.service';
import getFileExtensionIcon from '../../components/file-extension-helper';
import { FirebaseFileUploadApiService } from '../../services/firebase/firebase-file-upload-api.service';
import { FirebaseShareFilesApiService } from '../../services/firebase/firebase-share-files-api.service';
import { IconButtonComponent } from "../../components/app-button/icon-button/icon-button.component";
import { IonContent } from "@ionic/angular/standalone";

@Component({
	selector: 'view-share-file',
	standalone: true,
	imports: [
		LogoComponent,
		RouteButtonComponent,
		AppButtonComponent,
		ReactiveFormsModule,
		IconButtonComponent,
		IonContent
	],
	templateUrl: './share-file.component.html',
	styleUrl: './share-file.component.css',
	providers: [CookieService]
})
export class ShareFileComponent {
	uploadedFiles: File[] = [];
	screenIsPhone = false;

	readonly MAX_FILE_SIZE = 150000;
	readonly MAX_TOTAL_SIZE = 2e+9; // 2 GB

	private readonly router = inject(Router);
	private readonly sd = inject(ScreenDetectorService)
	private readonly cookieHandler = inject(CookieHandler);
	private readonly BACKEND_FILE_UPLOAD_API = inject(FirebaseFileUploadApiService);
	private readonly BACKEND_SHARE_FILES_API = inject(FirebaseShareFilesApiService);


	constructor() {
		this.screenIsPhone = this.sd.isPhoneScreen();
		this.sd.checkOnResize((isphone) => {
			this.screenIsPhone = isphone;
		});
	}

	fileExtensionIcon(file: File) {
		return getFileExtensionIcon(file);
	}

	totalFileSize() {
		if (this.uploadedFiles.length < 1) return 0;

		return this.uploadedFiles.map(f => f.size).reduce((a, b) => a + b);
	}

	removeEntry(file: File) {
		this.uploadedFiles = this.uploadedFiles.filter(f => f != file);
	}

	fileListHasIndividualFileExceedingLimit() {
		for (let file of this.uploadedFiles)
			if (file.size > this.MAX_FILE_SIZE) return true;

		return false;
	}

	allowCreateUrl() {
		return this.fileSizeValidator() && this.uploadedFiles.length > 0 && !this.fileListHasIndividualFileExceedingLimit();
	}

	fileSizeValidator() {
		return this.totalFileSize() < this.MAX_TOTAL_SIZE;
	}

	openFilePicker() {
		const inputElement = document.getElementById('file-drop-input');
		if (inputElement !== null) inputElement.click();
	}

	clearFileList() {
		this.uploadedFiles = [];
	}

	formatUploadedFileSize(bytes: number) {
		return formatFileSize(bytes);
	}

	async submitFiles() {
		if (this.uploadedFiles.length < 1) throw new Error("Uploaded file list is empty.");

		const inputElement = document.getElementById('file-drop-input') as HTMLInputElement;
		if (inputElement === null || inputElement === undefined) throw new Error("Could not find input element.");

		try {
			const uploaded = await this.BACKEND_FILE_UPLOAD_API.uploadFiles(this.uploadedFiles);

			const sharedFilesEntry = await this.BACKEND_SHARE_FILES_API.createUpload(uploaded, this.getUserIfLoggedIn());
			await this.router.navigate(['/finish', sharedFilesEntry.id], {
				queryParams: { uploadType: 'files' }
			});
		} catch (e) {
			console.error("Error when uploading files to server:", e);
		}
	}

	getUserIfLoggedIn(): User | null {
		return this.cookieHandler.getUserCookies();
	}

	onFilePicked(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		const files = inputElement.files;

		for (let i = 0; i < files!.length || 0; i++) {
			const file = files?.item(i);

			if (file !== null && file !== undefined) {
				if (this.uploadedFiles.length < 1) {
					this.uploadedFiles.push(file);
					continue;
				}

				const filenames = this.uploadedFiles.map(f => f.name);
				if (filenames.includes(file.name)) continue;

				this.uploadedFiles.push(file);
			}
		}
	}
}
