import { Component } from '@angular/core';
import {AppButtonComponent} from '../../components/app-button/app-button.component';
import {LogoComponent} from '../../components/logo/logo.component';

@Component({
  selector: 'view-register',
  standalone: true,
  imports: [
    AppButtonComponent,
    LogoComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
