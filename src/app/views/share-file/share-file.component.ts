import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BACKEND_FILE_UPLOAD_API, BACKEND_SHARE_FILES_API } from '../../app.component';
import formatFileSize from '../../components/fileSizeFormatter';
import User from '../../models/user';
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';
import { ScreenDetectorService } from '../../services/screenDetector/screenDetector.service';

@Component({
  selector: 'view-share-file',
  standalone: true,
  imports: [
    LogoComponent,
    RouteButtonComponent,
    AppButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './share-file.component.html',
  styleUrl: './share-file.component.css',
  providers: [CookieService]
})
export class ShareFileComponent {
  uploadedFiles: File[] = [];
  screenIsPhone = false;

  private readonly COMPRESSED_EXTS = ['zip', 'rar', '7z'];
  private readonly IMAGE_EXTS = ['jpeg', 'png', 'tiff', 'bmp', 'webp', 'gif'];
  private readonly VIDEO_EXTS = ['mp4'];
  private readonly EDITABLE_DOC_EXTS = ['doc', 'docs', 'docx'];
  private readonly EXCEL_EXTS = ['xlsx'];
  private readonly DOCUMENT_EXTS = ['pdf'];

  private readonly cookieHandler: CookieHandler;

  constructor(private router: Router, private cookieService: CookieService, private sd: ScreenDetectorService) {
    this.cookieHandler = new CookieHandler(cookieService);
    this.screenIsPhone = this.sd.isPhoneScreen();
    this.sd.checkOnResize((isphone) => {
      this.screenIsPhone = isphone;
    });
  }

  fileValidator() {
    return !(this.uploadedFiles.length > 0);
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
      const uploaded = await BACKEND_FILE_UPLOAD_API.uploadFiles(this.uploadedFiles);

      const sharedFilesEntry = await BACKEND_SHARE_FILES_API.createUpload(uploaded, this.getUserIfLoggedIn());
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

  getFileExtensionIcon(file: File) {
    const extension = file.name.substring(file.name.lastIndexOf('.') + 1);

    if (this.COMPRESSED_EXTS.includes(extension)) return "compressed_file";
    if (this.IMAGE_EXTS.includes(extension)) return "png_file";
    if (this.VIDEO_EXTS.includes(extension)) return "mp4_file";
    if (this.EDITABLE_DOC_EXTS.includes(extension)) return "docx_file";
    if (this.EXCEL_EXTS.includes(extension)) return "xlsx_file";
    if (this.DOCUMENT_EXTS.includes(extension)) return "pdf_file";

    return "generic_file";
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
