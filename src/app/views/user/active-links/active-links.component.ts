import { Component } from '@angular/core';
import { ActiveLinkEntryComponent } from "../../../components/active-link-entry/active-link-entry.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";

@Component({
  selector: 'view-user-active-links',
  standalone: true,
  imports: [ActiveLinkEntryComponent, AppButtonComponent],
  templateUrl: './active-links.component.html',
  styleUrl: './active-links.component.css'
})
export class UserActiveLinksComponent {

}
