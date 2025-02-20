import { Component, Input } from '@angular/core';
import { IconSelectorComponent } from "../icons/icon-selector/icon-selector.component";
import IconType from '../icons/icon-properties';

type LoginInputType = "email" | "password";

@Component({
  selector: 'app-login-input',
  standalone: true,
  imports: [IconSelectorComponent],
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.css'
})
export class LoginInputComponent {
  @Input() type: LoginInputType = "email";

  getInputName() {
    return "login-input-" + this.type;
  }

  getPlaceholder() {
    return this.capitalize(this.type);
  }

  getIconType(): IconType {
    switch (this.type) {
      case 'email':
        return "user";
      case "password":
        return "lock";
    }
  }

  private capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
}
