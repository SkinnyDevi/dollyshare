import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";

@Component({
  selector: 'view-home',
  standalone: true,
  imports: [LogoComponent, RouteButtonComponent, AppButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
