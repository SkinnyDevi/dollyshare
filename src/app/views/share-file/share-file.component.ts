import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";

@Component({
  selector: 'view-share-file',
  standalone: true,
  imports: [
    LogoComponent,
    RouteButtonComponent
  ],
  templateUrl: './share-file.component.html',
  styleUrl: './share-file.component.css'
})
export class ShareFileComponent {

}
