import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { LogoComponent } from "../../components/logo/logo.component";
import { ShareFileComponent } from "../share-file/share-file.component";
import db from "../../../../mock/db.json"
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";

@Component({
  selector: 'app-download-file',
  standalone: true,
  imports: [AppButtonComponent, LogoComponent, ShareFileComponent, RouteButtonComponent],
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  @ViewChild(ShareFileComponent) ShareComponent!: ShareFileComponent;
  jsonUrl = "../../../../mock/db.json";
  constructor(private route: ActivatedRoute) {}
  uploadedFiles: File[] = [];

  getFileExtensionIcon(arg0: File) {
    return this.ShareComponent.getFileExtensionIcon(arg0);
  }

  formatFileSize(arg0: number) {
    return this.ShareComponent.formatFileSize(arg0);
  }
  
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('link_id');
    console.log(idParam);
    if (idParam) {
      const id = Number(idParam);
      this.buscarLinkPorId(id)
        .then(link => console.log(link))
        .catch(error => console.error('Error al buscar el link:', error));
    } else {
      console.error("No se encontró el id en la URL");
    }
  }

  async buscarLinkPorId(id: number): Promise<Link | null> {
    try {
      const data = db;
      console.log(data);
      const linkEncontrado = data.links.find((link: any) => link.id === id);
      if (linkEncontrado){
        const mediaIds=linkEncontrado.media;
        for (let fileId of mediaIds) {
          const file = data.file_storage.find((file: any) => file.id === fileId);
          if (file) {
            this.uploadedFiles.push(file);
          }
        }

      }else{
        return null;
      }
      return linkEncontrado
        ? {
            id: linkEncontrado.id,
            url: linkEncontrado.url,
            mediaIds: linkEncontrado.media || []
          }
        : null;
    } catch (error) {
      console.error('Error en la carga del JSON:', error);
      return null;
    }
  }
}

export interface Link {
  id: number;
  url: string;
  mediaIds: string[];
}


