import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconButtonComponent } from "../../../components/app-button/icon-button/icon-button.component";
import { ContactListBoxComponent } from "../../../components/contact-list-box/contact-list-box.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";
import { BACKEND_SHARE_FILES_API } from '../../../app.component';
import SharedText from '../../../models/shared_text';
import SharedFiles from '../../../models/shared_files';
import CookieHandler from '../../../services/cookies/cookies.service';
import { CookieService } from 'ngx-cookie-service';
import { FirebaseShareTextApiService } from '../../../services/firebase/firebase-share-text-api.service';

@Component({
  selector: 'view-user-manage-active-link',
  standalone: true,
  imports: [RouterLink, IconButtonComponent, ContactListBoxComponent, AppButtonComponent],
  templateUrl: './manage-active-link.component.html',
  styleUrl: './manage-active-link.component.css',
  providers: [CookieService]
})
export class ManageActiveLinkComponent implements OnInit {
  readonly LINK_ID: string;
  readonly UPLOAD_TYPE: "files" | "text" | null = null;

  private readonly cookieHandler = inject(CookieHandler);
  private readonly BACKEND_SHARE_TEXT_API = inject(FirebaseShareTextApiService);
  private readonly router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.LINK_ID = this.route.snapshot.paramMap.get('link_id')!;

    const windowPathname = window.location.pathname;
    if (windowPathname.includes("files") || windowPathname.includes('text')) {
      this.UPLOAD_TYPE = windowPathname.includes('files') ? "files" : "text";
    }
  }

  async ngOnInit(): Promise<void> {
    // Check if the owner of the link is the user, if not redirect
    let upload: SharedText | SharedFiles | null = null;

    if (this.UPLOAD_TYPE === "files") {
      try {
        upload = await BACKEND_SHARE_FILES_API.getUpload(this.LINK_ID);
      } catch (e: any) {
        if (e.status === 404) {
          await this.router.navigate(['/user/active-links']);
          console.error("Upload does not exist.");
        } else {
          console.error("An error ocurred retrieving the information of the upload:", e);
        }
      }
    } else if (this.UPLOAD_TYPE === "text") {
      try {
        upload = await this.BACKEND_SHARE_TEXT_API.getUploadById(this.LINK_ID);
      } catch (e: any) {
        if (e.status === 404) {
          await this.router.navigate(['/user/active-links']);
          console.error("Upload does not exist.");
        } else {
          console.error("An error ocurred retrieving the information of the upload:", e);
        }
      }
    } else {
      await this.router.navigate(['/user/active-links']);
      console.error("Unknown upload type to manage.");
      return;
    }

    if (upload === null) console.error("Upload retrieved cannot be queried.");
    else if (this.cookieHandler.getUserCookies() === null) return;
    else if (upload.owner !== this.cookieHandler.getUserCookies()!.id) {
      console.error("User is not the owner of the upload.");
      await this.router.navigate(['/user/active-links']);
    }
  }
}
