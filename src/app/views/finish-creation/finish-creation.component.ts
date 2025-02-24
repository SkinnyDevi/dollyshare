import { Component } from '@angular/core';
import {AppButtonComponent} from '../../components/app-button/app-button.component';
import {LogoComponent} from '../../components/logo/logo.component';

@Component({
  selector: 'app-finish-creation',
  standalone: true,
  imports: [
    AppButtonComponent,
    LogoComponent
  ],
  templateUrl: './finish-creation.component.html',
  styleUrl: './finish-creation.component.css'
})
export class FinishCreationComponent {

}
