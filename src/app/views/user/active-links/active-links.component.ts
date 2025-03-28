import { Component, OnInit } from '@angular/core';
import { ActiveLinkEntryComponent } from "../../../components/active-link-entry/active-link-entry.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../../services/cookies/cookies.service';
import User from '../../../models/user';
import { BACKEND_SHARE_FILES_API, BACKEND_SHARE_TEXT_API } from '../../../app.component';

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
export class UserActiveLinksComponent implements OnInit {
  private readonly cookieHandler: CookieHandler;
  private readonly loggedInUser: User;

  userActiveLinks: UploadLink[] = [];

  constructor(private cookieService: CookieService) {
    this.cookieHandler = new CookieHandler(cookieService);
    this.loggedInUser = this.cookieHandler.getUserCookies()!;
  }

  async ngOnInit(): Promise<void> {
    const fileUploads = await BACKEND_SHARE_FILES_API.getUploadsFromUser(this.loggedInUser);
    for (let upload of fileUploads)
      this.userActiveLinks.push({
        id: "files/" + upload.id,
        isPrivate: upload.sharedWith.length > 0
      });

    const textUploads = await BACKEND_SHARE_TEXT_API.getUploadsFromUser(this.loggedInUser);
    for (let upload of textUploads) this.userActiveLinks.push({
      id: "text/" + upload.id,
      isPrivate: upload.sharedWith.length > 0
    });

  }
}
