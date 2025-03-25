import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { ActivatedRoute,RouterLink } from '@angular/router';



@Component({
  selector: 'app-download-text',
  standalone: true,
  imports: [LogoComponent, RouteButtonComponent, AppButtonComponent],
  templateUrl: './download-text.component.html',
  styleUrl: './download-text.component.css'
})

export class DownloadTextComponent {
  readonly url: string;
  title: string="Tittle-default";
  body: string="body-default";

  constructor(private route: ActivatedRoute){
    this.url = this.route.snapshot.paramMap.get('link_id')  || 'This link is not avaisable';
  }
}
