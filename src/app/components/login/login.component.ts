import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form=this.formBuilder.group(
      {
        email: [
          '' ,
          [
            Validators.required,
            Validators.pattern('^(?=^.{6,254}$)(?![._%+-])(?!.*[._%+-]@)[a-z0-9._%+-]{1,64}@[a-z0-9.-]+[.][a-z]{2,4}$')
          ]
        ],
        password: [
          '' ,
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        deviceInfo:this.formBuilder.group(
          {
          deviceId: ["17867868768"],
          devicetype: ["DEVICE_TYPE_ANDROID"],
          notificationToken:["67657575eececc34"]
          }
        )
      }
    )
  }

  ngOnInit(): void {
  }

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  isValidField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.invalid && fieldName?.touched);
  }

  onSubmit(): void {
    console.log("submiteado");
    console.log('Form->' + JSON. stringify(this.form.value));
  }

}
