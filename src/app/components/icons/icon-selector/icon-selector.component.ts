import { Component, Input } from '@angular/core';
import IconType, { IconColor } from '../icon-properties';
import { UserComponent } from "../user/user.component";
import { CloseComponent } from "../close/close.component";
import { LockComponent } from "../lock/lock.component";

@Component({
  selector: 'icon-selector',
  standalone: true,
  imports: [UserComponent, CloseComponent, LockComponent],
  templateUrl: './icon-selector.component.html',
  styles: `
    .icon-size {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `
})
export class IconSelectorComponent {
  @Input() type: IconType = "user";
  @Input() color: IconColor = "black";

  getFillClass() {
    return "fill-" + this.color;
  }
}
