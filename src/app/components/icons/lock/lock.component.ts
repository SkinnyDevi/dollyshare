import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-lock',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="47" height="51" viewBox="0 0 47 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.8568 22.865L11.8568 13.5917C11.8568 10.5174 13.0781 7.56898 15.252 5.39512C17.4258 3.22126 20.3742 2 23.4485 2C26.5228 2 29.4712 3.22126 31.645 5.39512C33.8189 7.56898 35.0402 10.5174 35.0402 13.5917L35.0402 22.865M7.22016 22.865L39.6768 22.865C42.2376 22.865 44.3135 24.9409 44.3135 27.5017L44.3135 43.73C44.3135 46.2908 42.2376 48.3667 39.6768 48.3667L7.22016 48.3667C4.6594 48.3667 2.5835 46.2908 2.5835 43.73L2.5835 27.5017C2.5835 24.9409 4.6594 22.865 7.22016 22.865Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: ``
})
export class LockComponent {
  @Input() fillClass = "";
}
