import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActiveLinkEntryComponent } from "../../../components/active-link-entry/active-link-entry.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../../services/cookies/cookies.service';
import User from '../../../models/user';
import { FirebaseFileUploadApiService } from '../../../services/firebase/firebase-file-upload-api.service';
import { FirebaseShareTextApiService } from '../../../services/firebase/firebase-share-text-api.service';
import { Subscription } from 'rxjs';
import {FirebaseShareFilesApiService} from '../../../services/firebase/firebase-share-files-api.service';

interface UploadLink {
  id: string;
  isPrivate: boolean;
}

@Component({
  selector: 'view-user-active-links',
  standalone: true,
  imports: [ActiveLinkEntryComponent, AppButtonComponent],
  templateUrl: './active-links.component.html',
  styleUrl: './active-links.component.css',
  providers: [CookieService]
})
export class UserActiveLinksComponent implements OnInit, OnDestroy {
  private readonly cookieHandler = inject(CookieHandler);
  private readonly BACKEND_FILE_UPLOAD_API = inject(FirebaseFileUploadApiService);
  private readonly BACKEND_SHARE_TEXT_API = inject(FirebaseShareTextApiService);
  private readonly BACKEND_SHARE_FILES_API = inject(FirebaseShareFilesApiService);
  private readonly loggedInUser: User;
  private textUploadsSubscription: Subscription | null = null;
  private fileUploadsSubscription: Subscription | null = null;

  userActiveLinks: UploadLink[] = [];

  constructor() {
    this.loggedInUser = this.cookieHandler.getUserCookies()!;
  }

  async ngOnInit(): Promise<void> {
    this.fileUploadsSubscription = this.BACKEND_SHARE_FILES_API.getUploadsFromUser$(this.loggedInUser).subscribe((fileUploads) => {
      const filteredActiveLinks = this.userActiveLinks.filter((al) => al.id.includes('text/'));
      const newLinks = fileUploads
        .map(upload => ({
          id: `files/${upload.id}`,
          isPrivate: upload.sharedWith.length > 0
        }));

      filteredActiveLinks.push(...newLinks);
      this.userActiveLinks = filteredActiveLinks;
    });

    this.textUploadsSubscription = this.BACKEND_SHARE_TEXT_API.getUploadsFromUser$(this.loggedInUser).subscribe((textUploads) => {
      const filteredActiveLinks = this.userActiveLinks.filter((al) => al.id.includes('files/'));
      const newLinks = textUploads
        .map(upload => ({
          id: `text/${upload.id}`,
          isPrivate: upload.sharedWith.length > 0
        }));

      filteredActiveLinks.push(...newLinks);
      this.userActiveLinks = filteredActiveLinks;
    });
  }

  ngOnDestroy(): void {
    this.textUploadsSubscription?.unsubscribe();
    this.fileUploadsSubscription?.unsubscribe();
  }

  async deleteAllUploads() {
    for (let link of this.userActiveLinks) await this.onEntryDelete(link.id);
  }

  async onEntryDelete(linkId: string) {
    const entry = this.userActiveLinks.find(ual => ual.id === linkId)
    if (entry === undefined) {
      console.error("Could not find entry", linkId, "to delete");
      return;
    }

    const splitId = entry.id.split('/');
    const uploadType = splitId[0];
    const uploadId = splitId[1];

    if (uploadType === "files") await this.deleteSharedFiles(uploadId);
    else if (uploadType === "text") await this.deleteSharedText(uploadId);
    else console.error("Unknown upload type:", uploadType);
  }

  async deleteSharedFiles(uploadId: string) {
    const sharedFile = await this.BACKEND_SHARE_FILES_API.getUpload(uploadId);
    for (let file of sharedFile.files) {
      try {
        await this.BACKEND_FILE_UPLOAD_API.deleteFileById(file);
      } catch (e) {
        console.error("Could not delete file", file, "associated with", sharedFile.id);
      }
    }

    await this.BACKEND_SHARE_FILES_API.deleteUpload(sharedFile);
  }

  async deleteSharedText(uploadId: string) {
    await this.BACKEND_SHARE_TEXT_API.deleteUploadById(uploadId);
  }
}
