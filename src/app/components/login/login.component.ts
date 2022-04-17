import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private formBuilder: FormBuilder/*, private authService:AuthService, private ruta:Router*/) {
    this.form=this.formBuilder.group(
      {
        email: ['' ,[Validators.required,Validators.pattern(
          '^(?=^.{6,254}$)(?![._%+-])(?!.*[._%+-]@)[a-z0-9._%+-]{1,64}@[a-z0-9.-]+[.][a-z]{2,4}$'
          )]],
        password: ['' ,[Validators.required,Validators.minLength(8)]],
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

  isEmptyField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.value=="")
  }

  onSubmit(event:Event): void {
    console.log("submiteado");
    console.log('Form->' + JSON. stringify(this.form.value));
    // event.preventDefault;
    // this.authService.login(this.form.value).subscribe(data=>{
    //   console.log("DATA:" + JSON.stringify(data));
    //   this.ruta.navigate(['/portfolio']);
    // })
  }

}
