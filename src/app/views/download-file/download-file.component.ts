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

@Component({
  selector: 'app-download-file',
  standalone: true,
  imports: [AppButtonComponent, LogoComponent, RouteButtonComponent],
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}
  uploadedFiles: UploadedFile[] = [];
  property:SharedFiles | undefined;
  fileExtensionIcon(file:UploadedFile){
      return getFileExtensionIcon(file as unknown as File);
  }

  formatFileSize(arg0: number) {
    return formatFileSize(arg0);
  }

  async ngOnInit():Promise <void> {
    const idParam = this.route.snapshot.paramMap.get('link_id');

    if (idParam) {
      this.property=await BACKEND_SHARE_FILES_API.getUpload(idParam);
      for(let file of this.property.files){
        this.uploadedFiles.push(await BACKEND_FILE_UPLOAD_API.getFileFrom(file));
      }
      console.log(this.uploadedFiles)
    } else {
      console.error("No se encontró el id en la URL");
    }
  }
  getExpiryDate(timestamp: number) {
      const length = BACKEND_SHARE_FILES_API.SHARED_FILES_LIFETIME_DAYS;
      return `${length} days (${new Date(timestamp).toLocaleDateString()})`;
  }
}


