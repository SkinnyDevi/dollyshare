import { Component } from '@angular/core';
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { LoginButtonComponent } from "../../components/app-button/login-button/login-button.component";

@Component({
  selector: 'HomeView',
  standalone: true,
  imports: [AppButtonComponent, LoginButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
