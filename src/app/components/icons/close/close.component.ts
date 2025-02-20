import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'icon-close',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="50" height="50" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52 2L2 52M2 2L52 52" stroke="#1E1E1E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None
})
export class CloseComponent {
  @Input() fillClass = "";
}
