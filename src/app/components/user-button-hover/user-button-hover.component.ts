import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';

@Component({
  selector: 'app-user-button-hover',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-button-hover.component.html',
  styleUrl: './user-button-hover.component.css',
  providers: [CookieService]
})
export class UserButtonHoverComponent {
  @Output() closeCallback = new EventEmitter<null>();

  private readonly cookieHandler: CookieHandler;

  constructor(private cookieService: CookieService) {
    this.cookieHandler = new CookieHandler(cookieService);
  }

  closeOptions() {
    this.closeCallback.emit(null);
  }

  async logOut() {
    await this.cookieHandler.deleteLoginCookies();
    window.location.reload();
  }
}
