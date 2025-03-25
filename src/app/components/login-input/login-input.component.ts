import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { IconSelectorComponent } from "../icons/icon-selector/icon-selector.component";
import IconType from '../icons/icon-properties';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type LoginInputType = "email" | "password";

@Component({
  selector: 'app-login-input',
  standalone: true,
  imports: [IconSelectorComponent],
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginInputComponent),
      multi: true
    }
  ]
})
export class LoginInputComponent implements ControlValueAccessor {
  @Input() type: LoginInputType = "email";
  @Input() disabled = false;

  revealPassword = false;
  value = "";

  constructor(private elRef: ElementRef) { }

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };


  getInputName() {
    return "login-input-" + this.type;
  }

  getPlaceholder() {
    return this.capitalize(this.type);
  }

  getIconType(): IconType {
    switch (this.type) {
      case 'email':
        return "user";
      case "password":
        return "lock";
    }
  }

  toggleRevealPassword() {
    this.revealPassword = !this.revealPassword;
    const rootElement = this.elRef.nativeElement as HTMLDivElement;
    const inputElement = rootElement.querySelector('input')!;
    inputElement.type = this.revealPassword ? "text" : "password";
  }

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

  private capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
}
