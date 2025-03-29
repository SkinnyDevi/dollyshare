import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { ActivatedRoute,RouterLink } from '@angular/router';
import SharedText from '../../models/shared_text';
import { BACKEND_SHARE_TEXT_API } from '../../app.component';



@Component({
  selector: 'app-download-text',
  standalone: true,
  imports: [LogoComponent, RouteButtonComponent, AppButtonComponent],
  templateUrl: './download-text.component.html',
  styleUrl: './download-text.component.css'
})

export class DownloadTextComponent {
getExpiryDate(arg0: number) {
  const length = BACKEND_SHARE_TEXT_API.SHARED_TEXT_LIFETIME_DAYS;
  return `${length} days (${new Date(arg0).toLocaleDateString()})`;
}
  readonly url: string;
  property:SharedText|undefined;

  constructor(private route: ActivatedRoute){
    this.url = this.route.snapshot.paramMap.get('link_id')  || 'This link is not avaisable';
  }
  async ngOnInit():Promise <void> {
      const idParam = this.route.snapshot.paramMap.get('link_id');
      if (idParam) {
        this.property=await BACKEND_SHARE_TEXT_API.getUploadById(idParam);
      } else {
        console.error("'This link is not avaisable'");
      }
  }
}
