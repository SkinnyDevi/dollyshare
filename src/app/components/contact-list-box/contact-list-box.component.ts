import { Component } from '@angular/core';
import { AddContactBoxComponent } from "../add-contact-box/add-contact-box.component";
import { ContactListEntryComponent } from "./contact-list-entry/contact-list-entry.component";

@Component({
  selector: 'app-contact-list-box',
  standalone: true,
  imports: [AddContactBoxComponent, ContactListEntryComponent],
  templateUrl: './contact-list-box.component.html',
  styleUrl: './contact-list-box.component.css'
})
export class ContactListBoxComponent {

}
