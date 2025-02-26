import { Component } from '@angular/core';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { CommonInputFieldComponent } from "../../components/common-input-field/common-input-field.component";

@Component({
  selector: 'view-register',
  standalone: true,
  imports: [
    AppButtonComponent,
    LogoComponent,
    CommonInputFieldComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
