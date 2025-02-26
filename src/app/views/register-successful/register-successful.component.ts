import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";

@Component({
  selector: 'app-register-successful',
  standalone: true,
  imports: [
    LogoComponent,
    RouteButtonComponent
  ],
  templateUrl: './register-successful.component.html',
  styleUrl: './register-successful.component.css'
})
export class RegisterSuccessfulComponent {

}
