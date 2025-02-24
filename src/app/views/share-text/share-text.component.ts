import { Component } from '@angular/core';
import {AppButtonComponent} from '../../components/app-button/app-button.component';
import {LogoComponent} from '../../components/logo/logo.component';

@Component({
  selector: 'view-share-text',
  standalone: true,
  imports: [
    AppButtonComponent,
    LogoComponent
  ],
  templateUrl: './share-text.component.html',
  styleUrl: './share-text.component.css'
})
export class ShareTextComponent {

}
