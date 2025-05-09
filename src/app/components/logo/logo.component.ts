import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  @Input() width = 200;
  @Input() useReturnToHome = false;

  getLogoStyles() {
    if (this.useReturnToHome) return "return-to-home-logo";
    return "";
  }

  returnToHomeView() {
    if (this.useReturnToHome) return "/";
    return "";
  }
}
