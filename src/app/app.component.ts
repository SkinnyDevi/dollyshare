import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import ShareFilesAPI from './services/base-apis/base_share_files.service';
import ShareTextAPI from './services/base-apis/base_share_text.service';
import UserAPI from './services/base-apis/base_user.service';
import JsonUserAPI from './services/jsonserver/json_user_api.service';

export const BACKEND_USER_API: UserAPI = new JsonUserAPI();
export const BACKEND_SHARE_FILES_API: ShareFilesAPI = {} as ShareFilesAPI;
export const BACKEND_SHARE_TEXT_API: ShareTextAPI = {} as ShareTextAPI;

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
