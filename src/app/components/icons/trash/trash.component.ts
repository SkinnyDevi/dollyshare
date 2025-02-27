import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-trash',
  standalone: true,
  imports: [],
  template: `
    <svg [classList]="fillClass" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.25 12.5H10.4167M10.4167 12.5H43.75M10.4167 12.5V41.6666C10.4167 42.7717 10.8557 43.8315 11.6371 44.6129C12.4185 45.3943 13.4783 45.8333 14.5833 45.8333H35.4167C36.5217 45.8333 37.5815 45.3943 38.3629 44.6129C39.1443 43.8315 39.5833 42.7717 39.5833 41.6666V12.5M16.6667 12.5V8.33329C16.6667 7.22822 17.1057 6.16842 17.8871 5.38701C18.6685 4.60561 19.7283 4.16663 20.8333 4.16663H29.1667C30.2717 4.16663 31.3315 4.60561 32.1129 5.38701C32.8943 6.16842 33.3333 7.22822 33.3333 8.33329V12.5M20.8333 22.9166V35.4166M29.1667 22.9166V35.4166" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  styles: ``
})
export class TrashComponent {
  @Input() fillClass = "";
}
