import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import ShareFilesAPI from './services/base-apis/base_share_files.service';
import ShareTextAPI from './services/base-apis/base_share_text.service';
import UserAPI from './services/base-apis/base_user.service';
import JsonUserAPI from './services/jsonserver/json_user_api.service';
import FileUploadAPI from './services/base-apis/base_file_upload.service';
import JsonFileUploadAPI from './services/jsonserver/json_file_upload_api.service';
import JsonShareFilesAPI from './services/jsonserver/json_share_files_api.service';

export const BACKEND_USER_API: UserAPI = new JsonUserAPI();
export const BACKEND_SHARE_FILES_API: ShareFilesAPI = new JsonShareFilesAPI();
export const BACKEND_SHARE_TEXT_API: ShareTextAPI = {} as ShareTextAPI;
export const BACKEND_FILE_UPLOAD_API: FileUploadAPI = new JsonFileUploadAPI();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dollyshare';
}
