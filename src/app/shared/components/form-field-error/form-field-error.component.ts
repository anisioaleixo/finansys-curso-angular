import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{erroMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  //Public methods
  public get erroMessage(): string | null {
    if (this.mustShowErrorMessage())
      return this.getErrroMessage();
    else
      return null;
  }

  //Private methods
  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrroMessage(): string | null {
    if (this.formControl.errors.required)
      return "dado obrigatório";

    if (this.formControl.errors.email)
      return "formato de e-mail invalido";

    else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `deve ter no mínimo ${requiredLength} caracteres`;

    } else if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `deve ter no máximo ${requiredLength} caracteres`;

    } else
      return null;
  }

}
