import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-hidden',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.5 40.5C36.615 43.4614 31.8843 45.102 27 45.1818C11.0909 45.1818 2 27 2 27C4.82702 21.7316 8.74803 17.1287 13.5 13.5M22.2273 9.36364C23.7917 8.99745 25.3933 8.81441 27 8.81818C42.9091 8.81818 52 27 52 27C50.6204 29.5809 48.9751 32.0108 47.0909 34.25M31.8182 31.8182C31.194 32.4881 30.4413 33.0254 29.6049 33.398C28.7685 33.7707 27.8657 33.971 26.9502 33.9872C26.0347 34.0033 25.1254 33.8349 24.2764 33.492C23.4274 33.1491 22.6562 32.6387 22.0087 31.9913C21.3613 31.3438 20.8509 30.5726 20.508 29.7236C20.1651 28.8746 19.9967 27.9653 20.0128 27.0498C20.029 26.1343 20.2293 25.2315 20.602 24.3951C20.9746 23.5588 21.5119 22.806 22.1818 22.1818M2 2L52 52" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: ``
})
export class HiddenComponent {
  @Input() fillClass = "";
}
