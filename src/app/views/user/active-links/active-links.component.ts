import { Component } from '@angular/core';
import { IconSelectorComponent } from "../../../components/icons/icon-selector/icon-selector.component";

@Component({
  selector: 'view-user-active-links',
  standalone: true,
  imports: [IconSelectorComponent],
  templateUrl: './active-links.component.html',
  styleUrl: './active-links.component.css'
})
export class UserActiveLinksComponent {

}
