import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LogoComponent {
  @Input() width = 200;
}
