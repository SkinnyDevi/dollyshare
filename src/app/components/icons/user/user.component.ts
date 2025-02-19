import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-user',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="54" height="60" viewBox="0 0 54 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52 58V51.7778C52 48.4773 50.683 45.312 48.3388 42.9782C45.9946 40.6444 42.8152 39.3333 39.5 39.3333H14.5C11.1848 39.3333 8.00537 40.6444 5.66116 42.9782C3.31696 45.312 2 48.4773 2 51.7778V58M39.5 14.4444C39.5 21.3173 33.9036 26.8889 27 26.8889C20.0964 26.8889 14.5 21.3173 14.5 14.4444C14.5 7.57157 20.0964 2 27 2C33.9036 2 39.5 7.57157 39.5 14.4444Z" stroke="#1E1E1E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: ``
})
export class UserComponent {
  @Input() fillClass = "";
}
