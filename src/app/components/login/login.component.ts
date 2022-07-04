import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;

  form:FormGroup;

  isLogged=false;
  loginUser!: LoginUser;
  email!: string;
  password!: string;
  errMssg!: string;

  constructor(
    private formBuilder: FormBuilder, 
    private tokenService: TokenService,
    private authService:AuthService,
    private router:Router) {
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
    if (this.tokenService.getToken()) {
      this.isLogged=true;
    }
}

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  isInvalidField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.invalid && fieldName?.touched);
  }

  isEmptyField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.value=="")
  }

  showPass() {
    this.showPassword=!this.showPassword;
  }

  onSubmit(event:Event): void {
    this.loginUser=new LoginUser(this.Email?.value, this.Password?.value);
    this.authService.login(this.loginUser).subscribe({
      next: (data: any) => {
        this.isLogged=true;
        this.tokenService.setToken(data.token);
        this.tokenService.setEmail(data.email);
        this.tokenService.setAuthorities(data.authorities);
        this.router.navigate(['/portfolio']);
      },
      error: (data: any) => {
        this.router.navigate(['/login']);
        this.isLogged=false;
      }
    });
  }

  broseAsGuest(): void {
    console.log("Navegas como invitado.");
    //lógica TEMPORAL para iniciar sesión como invitado
    this.loginUser=new LoginUser('guest@portfolio.com', 'guestuser');
    this.authService.login(this.loginUser).subscribe({
      next: (data: any) => {
        this.isLogged=true;
        this.tokenService.setToken(data.token);
        this.tokenService.setEmail(data.email);
        this.tokenService.setAuthorities(data.authorities);
        this.router.navigate(['/portfolio']);
      },
      error: () => {
        this.isLogged=false;
        this.router.navigate(['/login']);
      }
    });
  }

}
