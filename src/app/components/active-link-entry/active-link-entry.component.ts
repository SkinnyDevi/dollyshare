import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconSelectorComponent } from "../icons/icon-selector/icon-selector.component";
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-active-link-entry',
	standalone: true,
	imports: [RouterLink, IconSelectorComponent],
	templateUrl: './active-link-entry.component.html',
	styleUrl: './active-link-entry.component.css'
})
export class ActiveLinkEntryComponent {
	@Input() isPrivate = false;
	@Input() linkId = "";
	@Output() deleteCallback = new EventEmitter<string>();

	onDelete() {
		this.deleteCallback.emit(this.linkId);
	}
}
