import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  styleUrl: './share-file.component.css'
})
export class ShareFileComponent {
  uploadedFiles: File[] = [];

  private readonly COMPRESSED_EXTS = ['zip', 'rar', '7z'];
  private readonly IMAGE_EXTS = ['jpeg', 'png', 'tiff', 'bmp', 'webp'];
  private readonly VIDEO_EXTS = ['mp4'];
  private readonly EDITABLE_DOC_EXTS = ['doc', 'docs', 'docx'];
  private readonly EXCEL_EXTS = ['xlsx'];
  private readonly DOCUMENT_EXTS = ['pdf'];

  constructor(private router: Router) { }

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

  submitFiles() {
    this.router.navigate(['/finish'])
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
