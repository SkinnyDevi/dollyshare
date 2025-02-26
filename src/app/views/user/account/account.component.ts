import { Component } from '@angular/core';
import { CommonInputFieldComponent } from "../../../components/common-input-field/common-input-field.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";

@Component({
  selector: 'view-user-account',
  standalone: true,
  imports: [CommonInputFieldComponent, AppButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class UserAccountComponent {

}
