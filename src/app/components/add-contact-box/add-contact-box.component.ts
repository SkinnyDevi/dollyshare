import { Component } from '@angular/core';
import { AppButtonComponent } from "../app-button/app-button.component";

@Component({
  selector: 'app-add-contact-box',
  standalone: true,
  imports: [AppButtonComponent],
  templateUrl: './add-contact-box.component.html',
  styleUrl: './add-contact-box.component.css'
})
export class AddContactBoxComponent {

}
