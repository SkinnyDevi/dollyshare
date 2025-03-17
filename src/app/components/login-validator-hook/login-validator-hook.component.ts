import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import CookieHandler from '../../services/cookies/cookies.service';

@Component({
  selector: 'login-validator-hook',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``,
  providers: [CookieService]
})
export class LoginValidatorHookComponent implements OnInit {
  private readonly cookieHandler: CookieHandler;

  @Input() disable = false;
  @Input() reverseCheck = false;

  constructor(private router: Router, private cookieService: CookieService) {
    this.cookieHandler = new CookieHandler(cookieService);
  }

  ngOnInit(): void {
    if (this.disable) return;

    if (this.reverseCheck) {
      if (this.cookieHandler.userCookiesExist())
        this.router.navigate(['/user/account']);

      return;
    }

    if (!this.cookieHandler.userCookiesExist())
      this.router.navigate(['/login']);
  }
}
