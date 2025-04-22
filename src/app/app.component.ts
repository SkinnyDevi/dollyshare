import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import ShareFilesAPI from './services/base-apis/base_share_files.service';
import ShareTextAPI from './services/base-apis/base_share_text.service';
import JsonShareFilesAPI from './services/jsonserver/json_share_files_api.service';
import JsonShareTextAPI from './services/jsonserver/json_share_text_api.service';
import { Firestore } from '@angular/fire/firestore';

export const BACKEND_SHARE_FILES_API: ShareFilesAPI = new JsonShareFilesAPI();
export const BACKEND_SHARE_TEXT_API: ShareTextAPI = new JsonShareTextAPI();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private firestore = inject(Firestore);

  title = 'dollyshare';
}
