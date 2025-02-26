import { Component } from '@angular/core';
import {AppButtonComponent} from "../../components/app-button/app-button.component";
import {LogoComponent} from "../../components/logo/logo.component";
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'view-share-file',
  standalone: true,
  imports: [
    AppButtonComponent,
    LogoComponent
  ],
  templateUrl: './share-file.component.html',
  styleUrl: './share-file.component.css'
})
export class ShareFileComponent {

}
