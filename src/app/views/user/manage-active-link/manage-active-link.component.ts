import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IconButtonComponent } from "../../../components/app-button/icon-button/icon-button.component";
import { ContactListBoxComponent } from "../../../components/contact-list-box/contact-list-box.component";
import { AppButtonComponent } from "../../../components/app-button/app-button.component";

@Component({
  selector: 'view-user-manage-active-link',
  standalone: true,
  imports: [RouterLink, IconButtonComponent, ContactListBoxComponent, AppButtonComponent],
  templateUrl: './manage-active-link.component.html',
  styleUrl: './manage-active-link.component.css'
})
export class ManageActiveLinkComponent {
  readonly LINK_ID: string;

  constructor(private route: ActivatedRoute) {
    this.LINK_ID = this.route.snapshot.paramMap.get('link_id')!;
  }
}
