import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/models';
import { AuthService } from 'src/app/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  form:FormGroup;
  loginUser: LoginUser = {email: "", password: ""};

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService
  ) {
    this.form=this.formBuilder.group(
      {
        email: ['' ,[Validators.required,Validators.pattern(
          '^(?=^.{6,254}$)(?![._%+-])(?!.*[._%+-]@)[a-z0-9._%+-]{1,64}@[a-z0-9.-]+[.][a-z]{2,4}$'
          )]],
        password: ['' ,[Validators.required,Validators.minLength(8)]]
      }
    )
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  isInvalidField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.invalid && fieldName?.touched);
  }

  isEmptyField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.value=="");
  }

  showPass() {
    this.showPassword=!this.showPassword;
  }

  onSubmit(isGuest: boolean): void {
    if (!isGuest) {
      this.loginUser.email = this.email?.value;
      this.loginUser.password = this.password?.value;
    } else {
      this.loginUser.email = 'guest@portfolio.com';
      this.loginUser.password = 'guestuser';
    }
    this.authService.login(this.loginUser);
  }

}
