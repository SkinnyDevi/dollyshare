import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";

@Component({
  selector: 'app-finish-creation',
  standalone: true,
  imports: [
    LogoComponent,
    RouteButtonComponent
  ],
  templateUrl: './finish-creation.component.html',
  styleUrl: './finish-creation.component.css'
})
export class FinishCreationComponent {

}
