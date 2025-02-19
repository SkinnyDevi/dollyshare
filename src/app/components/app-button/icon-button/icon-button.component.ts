import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import IconType from '../../icons/icon-properties';
import { IconSelectorComponent } from "../../icons/icon-selector/icon-selector.component";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [RouterLink, IconSelectorComponent],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css'
})
export class IconButtonComponent {
  @Input() routerLink = "";
  @Input() icon: IconType = "user";

  getIconSource() {
    return `assets/icon/${this.icon}.svg`;
  }
}
