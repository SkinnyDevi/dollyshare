import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { ShareFileComponent } from "../share-file/share-file.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import formatFileSize from '../../components/fileSizeFormatter';
import UploadedFile from '../../models/uploaded_file';
import { BACKEND_FILE_UPLOAD_API, BACKEND_SHARE_FILES_API } from '../../app.component';
import SharedFiles from '../../models/shared_files';

@Component({
  selector: 'app-download-file',
  standalone: true,
  imports: [AppButtonComponent, LogoComponent, ShareFileComponent, RouteButtonComponent],
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  @ViewChild(ShareFileComponent) ShareComponent!: ShareFileComponent;
  constructor(private route: ActivatedRoute) {}
  uploadedFiles: UploadedFile[] = [];
  property:SharedFiles | undefined;
  getFileExtensionIcon(arg0: UploadedFile) {
    return this.ShareComponent.getFileExtensionIcon(arg0 as unknown as File);
  }

  formatFileSize(arg0: number) {
    return formatFileSize(arg0);
  }

  async ngOnInit():Promise <void> {
    const idParam = this.route.snapshot.paramMap.get('link_id');
    console.log(idParam);
    if (idParam) {
      this.property=await BACKEND_SHARE_FILES_API.getUpload(idParam);
      for(let file of this.property.files){
        this.uploadedFiles.push(await BACKEND_FILE_UPLOAD_API.getFileFrom(file));
      }
    } else {
      console.error("No se encontró el id en la URL");
    }
  }
}


