import { Component, Input } from '@angular/core';
import { IconSelectorComponent } from "../../icons/icon-selector/icon-selector.component";

@Component({
  selector: 'app-contact-list-entry',
  standalone: true,
  imports: [IconSelectorComponent],
  templateUrl: './contact-list-entry.component.html',
  styleUrl: './contact-list-entry.component.css'
})
export class ContactListEntryComponent {
  @Input() contact = "";
}
