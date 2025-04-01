import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import formatFileSize from '../../components/fileSizeFormatter';
import UploadedFile from '../../models/uploaded_file';
import { BACKEND_FILE_UPLOAD_API, BACKEND_SHARE_FILES_API } from '../../app.component';
import SharedFiles from '../../models/shared_files';
import getFileExtensionIcon from '../../components/file-extension-helper';
import JSZip from 'jszip';
@Component({
  selector: 'app-download-file',
  standalone: true,
  imports: [AppButtonComponent, LogoComponent, RouteButtonComponent],
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  uploadedFiles: UploadedFile[] = [];
  property: SharedFiles | undefined;

  fileExtensionIcon(file: UploadedFile) {
    return getFileExtensionIcon(file as unknown as File);
  }

  formatFileSize(arg0: number) {
    return formatFileSize(arg0);
  }

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('link_id');

    if (idParam) {
      this.property = await BACKEND_SHARE_FILES_API.getUpload(idParam);
      for (let file of this.property.files) {
        this.uploadedFiles.push(await BACKEND_FILE_UPLOAD_API.getFileFrom(file));
      }
    } else {
      console.error("No se encontró el id en la URL");
    }
  }

  getExpiryDate(arg0: number) {
    const expiryDate = new Date(arg0);
    const now = new Date();
    const timeDiff = expiryDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return `${daysLeft} days (${new Date(arg0).toLocaleDateString()})`;
  }
  
  private convertToFile(uploadedFile: UploadedFile): File {
    const base64= uploadedFile.content.split(',')[1];
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
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}


