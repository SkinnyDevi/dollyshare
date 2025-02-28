import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-arrow',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.3021 27.0834L27.9688 38.75L25 41.6667L8.33334 25L25 8.33337L27.9688 11.25L16.3021 22.9167H41.6667V27.0834H16.3021Z" fill="#1D1B20"/>
    </svg>
  `,
  styles: ``
})
export class ArrowComponent {
  @Input() fillClass = "";
}
