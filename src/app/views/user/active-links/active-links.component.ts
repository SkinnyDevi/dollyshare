import { Component } from '@angular/core';
import { LogoComponent } from "../../../components/logo/logo.component";
import { UserTabsComponent } from "../../../components/user-tabs/user-tabs.component";

@Component({
  selector: 'view-user-active-links',
  standalone: true,
  imports: [LogoComponent, UserTabsComponent],
  templateUrl: './active-links.component.html',
  styleUrl: './active-links.component.css'
})
export class UserActiveLinksComponent {

}
