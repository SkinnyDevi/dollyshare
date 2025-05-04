import { Component, inject, OnInit } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { BACKEND_SHARE_FILES_API } from '../../app.component';
import SharedFiles from '../../models/shared_files';
import SharedText from '../../models/shared_text';
import formatFileSize from '../../components/fileSizeFormatter';
import { FirebaseShareTextApiService } from '../../services/firebase/firebase-share-text-api.service';

type UploadType = "files" | "text";

@Component({
  selector: 'app-finish-creation',
  standalone: true,
  imports: [
    LogoComponent,
    RouteButtonComponent
  ],
  templateUrl: './finish-creation.component.html',
  styleUrl: './finish-creation.component.css'
})
export class FinishCreationComponent implements OnInit {
  readonly LINK_ID: string;
  readonly uploadType: UploadType;
  uploadedFile: SharedFiles | null = null;
  uploadedText: SharedText | null = null;

  private readonly BACKEND_SHARE_TEXT_API = inject(FirebaseShareTextApiService);
  private readonly router = inject(Router)

  constructor(private route: ActivatedRoute) {
    this.LINK_ID = this.route.snapshot.paramMap.get('link_id')!;
    this.uploadType = this.route.snapshot.queryParamMap.get("uploadType")! as UploadType;

    if (this.uploadType !== "files" && this.uploadType !== "text") {
      this.router.navigate(['/'])
      console.error("No matching upload type for:", this.uploadType);
    };
  }

  async getUploadInfo() {
    if (this.uploadType === "files") {
      try {
        const upload = await BACKEND_SHARE_FILES_API.getUpload(this.LINK_ID);
        this.uploadedFile = upload;
      } catch (e: any) {
        if (e.status === 404) await this.router.navigate(['/']);
        console.warn("File upload ID not found, redirecting " + `(${this.LINK_ID}).`);
      }
    } else if (this.uploadType === "text") {
      try {
        const upload = await this.BACKEND_SHARE_TEXT_API.getUploadById(this.LINK_ID);
        this.uploadedText = upload;
      } catch (e: any) {
        if (e.status === 404) await this.router.navigate(['/']);
        console.warn("Text upload ID not found, redirecting " + `(${this.LINK_ID}).`);
      }
    } else {
      await this.router.navigate(['/'])
      console.error("Unknown upload type, redirecting to home.");
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getUploadInfo();
  }

  getItemString() {
    if (this.uploadedFile === null) return "No file found for details.";
    const items = this.uploadedFile.files.length > 1 ? " items" : " item";
    return this.uploadedFile?.files.length + items;
  }

  formatTotalFileSize(bytes: number) {
    return formatFileSize(bytes);
  }

  getExpiryDate(timestamp: number, type: UploadType) {
    const length = type === "files" ? BACKEND_SHARE_FILES_API.SHARED_FILES_LIFETIME_DAYS : this.BACKEND_SHARE_TEXT_API.SHARED_TEXT_LIFETIME_DAYS;
    return `${length} days (${new Date(timestamp).toLocaleDateString()})`;
  }

  getResultingLink() {
    const host = window.location.host;
    const protocol = window.location.protocol;

    return `${protocol}//${host}/download/${this.uploadType}/${this.LINK_ID}`
  }

  getRedirectLink() {
    return `/download/${this.uploadType}/${this.LINK_ID}`;
  }
}
