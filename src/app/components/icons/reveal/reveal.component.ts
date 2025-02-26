import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-reveal',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="50" height="38" viewBox="0 0 50 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.08331 19C2.08331 19 10.4166 2.33337 25 2.33337C39.5833 2.33337 47.9166 19 47.9166 19C47.9166 19 39.5833 35.6667 25 35.6667C10.4166 35.6667 2.08331 19 2.08331 19Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M25 25.25C28.4518 25.25 31.25 22.4518 31.25 19C31.25 15.5483 28.4518 12.75 25 12.75C21.5482 12.75 18.75 15.5483 18.75 19C18.75 22.4518 21.5482 25.25 25 25.25Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: `
    svg {
      margin-top: 3.5px;
    }
  `
})
export class RevealComponent {
  @Input() fillClass = "";
}
