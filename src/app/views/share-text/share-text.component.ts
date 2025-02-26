import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";

@Component({
  selector: 'view-share-text',
  standalone: true,
  imports: [
    LogoComponent,
    RouteButtonComponent
  ],
  templateUrl: './share-text.component.html',
  styleUrl: './share-text.component.css'
})
export class ShareTextComponent {

}
