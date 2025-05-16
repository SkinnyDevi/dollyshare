import { Component, ElementRef, Input, forwardRef } from '@angular/core';
import { IconSelectorComponent } from "../icons/icon-selector/icon-selector.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-common-input-field',
	standalone: true,
	imports: [IconSelectorComponent],
	templateUrl: './common-input-field.component.html',
	styleUrl: './common-input-field.component.css',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CommonInputFieldComponent),
			multi: true
		}
	]
})
export class CommonInputFieldComponent implements ControlValueAccessor {
	@Input() type: HTMLInputElement['type'] = "text";
	@Input() placeholder = "";
	@Input() label = "Common Input Label";
	@Input() required = false;
	@Input() disabled = false;
	@Input() hasError = false;

	revealPassword = false;
	value = ""

	constructor(private elRef: ElementRef) { }

	private onChange: (value: string) => void = () => { };
	private onTouched: () => void = () => { };

	onInput(event: Event) {
		const inputValue = (event.target as HTMLInputElement).value;
		this.value = inputValue;
		this.onChange(inputValue);
	}

	writeValue(value: string): void {
		this.value = value || '';
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	labelToInputName() {
		return this.label.toLowerCase().replaceAll(' ', '_');
	}

	toggleRevealPassword() {
		this.revealPassword = !this.revealPassword;
		const rootElement = this.elRef.nativeElement as HTMLDivElement;
		const inputElement = rootElement.querySelector('input')!;
		inputElement.type = this.revealPassword ? "text" : "password";
	}
}
