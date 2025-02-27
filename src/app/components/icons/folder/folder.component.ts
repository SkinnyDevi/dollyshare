import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-folder',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="54" height="49" viewBox="0 0 54 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52 42C52 43.3261 51.4732 44.5979 50.5355 45.5355C49.5979 46.4732 48.3261 47 47 47H7C5.67392 47 4.40215 46.4732 3.46447 45.5355C2.52678 44.5979 2 43.3261 2 42V7C2 5.67392 2.52678 4.40215 3.46447 3.46447C4.40215 2.52678 5.67392 2 7 2H19.5L24.5 9.5H47C48.3261 9.5 49.5979 10.0268 50.5355 10.9645C51.4732 11.9021 52 13.1739 52 14.5V42Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: ``
})
export class FolderComponent {
  @Input() fillClass = "";
}
