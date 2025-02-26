import { Component } from '@angular/core';
import { CommonInputFieldComponent } from "../../../components/common-input-field/common-input-field.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";

@Component({
  selector: 'view-user-change-password',
  standalone: true,
  imports: [CommonInputFieldComponent, AppButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class UserChangePasswordComponent {

}
