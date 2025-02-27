import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-folder-lock',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="54" height="49" viewBox="0 0 54 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M52 42C52 43.3261 51.4732 44.5979 50.5355 45.5355C49.5979 46.4732 48.3261 47 47 47H7C5.67392 47 4.40215 46.4732 3.46447 45.5355C2.52678 44.5979 2 43.3261 2 42V7C2 5.67392 2.52678 4.40215 3.46447 3.46447C4.40215 2.52678 5.67392 2 7 2H19.5L24.5 9.5H47C48.3261 9.5 49.5979 10.0268 50.5355 10.9645C51.4732 11.9021 52 13.1739 52 14.5V42Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.4444 27.35V22.75C21.4444 21.225 22.0298 19.7625 23.0716 18.6841C24.1135 17.6058 25.5266 17 27 17C28.4734 17 29.8865 17.6058 30.9284 18.6841C31.9702 19.7625 32.5556 21.225 32.5556 22.75V27.35M19.2222 27.35H34.7778C36.0051 27.35 37 28.3797 37 29.65V37.7C37 38.9703 36.0051 40 34.7778 40H19.2222C17.9949 40 17 38.9703 17 37.7V29.65C17 28.3797 17.9949 27.35 19.2222 27.35Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: ``
})
export class FolderLockComponent {
  @Input() fillClass = "";
}
