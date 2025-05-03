import { Component } from '@angular/core';
import { LogoComponent } from "../../components/logo/logo.component";
import { RouteButtonComponent } from "../../components/app-button/route-button/route-button.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import SharedText from '../../models/shared_text';
import { FirebaseShareTextApiService } from '../../services/firebase/firebase-share-text-api.service';



@Component({
  selector: 'app-download-text',
  standalone: true,
  imports: [LogoComponent, RouteButtonComponent, AppButtonComponent],
  templateUrl: './download-text.component.html',
  styleUrl: './download-text.component.css'
})

export class DownloadTextComponent {
  readonly url: string;
  property: SharedText | undefined;

  constructor(private route: ActivatedRoute, private shareTextApi: FirebaseShareTextApiService) {

    this.url = this.route.snapshot.paramMap.get('link_id') || 'This link is not available';
  }

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('link_id');
    if (idParam) {
      this.shareTextApi.getDocFromId(idParam).subscribe(data => this.property = data)
    }else{
      console.error("This link is not avaisable");
    }
  }

  getExpiryDate(arg0: number) {
    const expiryDate = new Date(arg0);
    const now = new Date();
    const timeDiff = expiryDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return `${daysLeft} days (${new Date(arg0).toLocaleDateString()})`;
  }
}
