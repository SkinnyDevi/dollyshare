import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, Platform } from "@ionic/angular/standalone";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import formatFileSize from '../../components/fileSizeFormatter';
import UploadedFile from '../../models/uploaded_file';
import SharedFiles from '../../models/shared_files';
import getFileExtensionIcon from '../../components/file-extension-helper';
import JSZip from 'jszip';
import { FirebaseFileUploadApiService } from '../../services/firebase/firebase-file-upload-api.service';
import { Subscription } from 'rxjs';
import { FirebaseShareFilesApiService } from '../../services/firebase/firebase-share-files-api.service';

@Component({
	selector: 'app-download-file',
	standalone: true,
	imports: [AppButtonComponent, LogoComponent, RouteButtonComponent, IonContent],
	templateUrl: './download-file.component.html',
	styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit, OnDestroy {
	uploadedFiles: UploadedFile[] = [];
	property: SharedFiles | undefined;

	private readonly route = inject(ActivatedRoute);
	private readonly BACKEND_FILE_UPLOAD_API = inject(FirebaseFileUploadApiService);
	private readonly BACKEND_SHARE_FILES_API = inject(FirebaseShareFilesApiService);
	private readonly platform = inject(Platform);
	private uploadedFilesSubcription: Subscription | null = null;

	fileExtensionIcon(file: UploadedFile) {
		return getFileExtensionIcon(file as unknown as File);
	}

	formatFileSize(arg0: number) {
		return formatFileSize(arg0);
	}

	async ngOnInit(): Promise<void> {
		const idParam = this.route.snapshot.paramMap.get('link_id');

		if (idParam) {
			this.property = await this.BACKEND_SHARE_FILES_API.getUpload(idParam);
			this.uploadedFilesSubcription = this.BACKEND_FILE_UPLOAD_API.getFilesFrom$(this.property.files).subscribe((uploadedFiles) => {
				this.uploadedFiles = uploadedFiles;
			})
		} else {
			console.error("No se encontró el id en la URL");
		}
	}

	ngOnDestroy(): void {
		this.uploadedFilesSubcription?.unsubscribe();
	}

	getExpiryDate(arg0: number) {
		const expiryDate = new Date(arg0);
		const now = new Date();
		const timeDiff = expiryDate.getTime() - now.getTime();
		const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

		return `${daysLeft} days (${new Date(arg0).toLocaleDateString()})`;
	}

	private convertToFile(uploadedFile: UploadedFile): File {
		const base64 = uploadedFile.content.split(',')[1];
		const binaryContent = atob(base64);
		const byteArray = new Uint8Array(binaryContent.length);
		for (let i = 0; i < binaryContent.length; i++) {
			byteArray[i] = binaryContent.charCodeAt(i);
		}
		return new File([byteArray], uploadedFile.name, {
			type: uploadedFile.type,
			lastModified: uploadedFile.createdAt
		});
	}

	async createZipFromUploadedFiles(): Promise<void> {
		const files = this.uploadedFiles.map(file => this.convertToFile(file));
		await this.createZip(files, 'uploaded_files.zip');
	}

	private async createZip(files: File[], zipName: string): Promise<void> {
		if (!files.length) {
			alert('No files to process');
			return;
		}

		const zip = new JSZip();
		for (const file of files) {
			const fileContent = await file.arrayBuffer();
			zip.file(file.name, fileContent);
		}

		const content = await zip.generateAsync({ type: 'blob' });
		this.downloadFile(content, zipName);
	}

	private downloadFile(blob: Blob, fileName: string): void {
		const isNative = this.platform.is("android") || this.platform.is("ios");
		if (isNative) {
			this.downloadFileNative(blob, fileName);
			return;
		}

		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}

	private async downloadFileNative(blob: Blob, fileName: string): Promise<void> {
		try {
			// Convert blob to base64 for Filesystem API
			const base64 = await this.blobToBase64(blob);

			// Write the file to the device's cache directory
			const file = await Filesystem.writeFile({
				path: fileName,
				data: base64,
				directory: Directory.Cache,
			});

			// Share the file to trigger download or open in another app
			await Share.share({
				title: fileName,
				url: file.uri,
				dialogTitle: 'Download ZIP',
			});
		} catch (error) {
			console.error('Error downloading file:', error);
			alert('Failed to download the file');
		}
	}

	// Helper method to convert Blob to base64
	private blobToBase64(blob: Blob): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result as string;
				// Remove the data URL prefix (e.g., "data:application/zip;base64,")
				resolve(result.split(',')[1]);
			};
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}
}