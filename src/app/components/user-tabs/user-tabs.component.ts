import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type SelectedViewButton = "account" | "password" | "links";

@Component({
  selector: 'app-user-tabs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-tabs.component.html',
  styleUrl: './user-tabs.component.css'
})
export class UserTabsComponent {
  @Input() selectedButton: SelectedViewButton = "account";

  getSelected(view: SelectedViewButton) {
    return this.selectedButton === view ? "selected-view" : "";
  }
}
