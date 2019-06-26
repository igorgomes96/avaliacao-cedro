import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, NgModel } from '@angular/forms';
import { formatNumber } from '@angular/common';
import { distinctUntilChanged, filter } from 'rxjs/operators';


export const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CustomInputComponent),
  multi: true,
};
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {

  @Input() name: string;
  @Input() label: string;
  @Input() id: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() control: AbstractControl | NgModel;
  @Input() readOnly = false;

  private innerValue: any;
  private value: any;
  public hasError = false;

  constructor() { }

  ngOnInit() {
    if (!this.placeholder) {
      this.placeholder = this.label;
    }

    this.control.statusChanges
      .pipe(distinctUntilChanged(), filter(_ => this.control.dirty))
      .subscribe(s => this.hasError = (s === 'INVALID'));

  }

  onChange: (_: any) => void = () => { };
  onTouch: (_: any) => void = () => { };

  updateValue(valor: any) {
    if (valor !== null) {
      this.innerValue = valor;
      this.value = valor;
    } else {
      this.innerValue = '';
    }
  }

  pushChanges(valor: any) {
    this.updateValue(valor);
    this.onChange(this.innerValue);
  }


  writeValue(valor: any): void {
    if (valor !== null) {
      this.innerValue = valor;
      this.value = valor;
    } else {
      this.innerValue = '';
    }
  }

  get mensagem(): string {
    let control = this.control;
    if (this.control instanceof NgModel) {
      control = (this.control as NgModel).control;
    }
    if (control.pristine) {
      return null;
    }
    for (const property in control.errors) {
      if (control.errors.hasOwnProperty(property)) {
        switch (property) {
          case 'required':
            return `${this.label} é obrigatório!`;
          case 'minlength':
            return `${this.label} deve ter no mínimo ${control.errors[property].requiredLength} caracteres!`;
          case 'maxlength':
            return `${this.label} deve ter no máximo ${control.errors[property].requiredLength} caracteres!`;
          case 'email':
            return 'Email inválido!';
          default:
            return null;
        }
      }
    }
    return null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.readOnly = isDisabled;
  }
}
