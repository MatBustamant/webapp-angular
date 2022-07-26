import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  template: '',
  styleUrls: ['./base-form.component.css']
})
export class BaseFormComponent {

  accion!: string;
  today: Date = new Date();
  form!: any;

  constructor() { }

  isInvalidField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.invalid && fieldName?.touched);
  }

  isEmptyField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.value=="" || fieldName?.value == null);
  }

  getField(field:string) {
    return this.form.get(field);
  }

  minDate(sdate: AbstractControl | null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && sdate) {
        const start = new Date(sdate.value);
        const end = new Date(control.value);
        return start <= end ? null: {minDate: {min: start, actual: end} };
      }
      return null;
    }
  }

  maxDate(edate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const start = new Date(control.value);
        const end = edate;
        return start <= end ? null: {maxDate: {max: end, actual: start} };
      }
      return null;
    }
  }

}
