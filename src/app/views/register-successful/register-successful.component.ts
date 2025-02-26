import { Component } from '@angular/core';
import {AppButtonComponent} from '../../components/app-button/app-button.component';
import {LogoComponent} from '../../components/logo/logo.component';

@Component({
  selector: 'app-register-successful',
  standalone: true,
  imports: [
    AppButtonComponent,
    LogoComponent
  ],
  templateUrl: './register-successful.component.html',
  styleUrl: './register-successful.component.css'
})
export class RegisterSuccessfulComponent {

}
