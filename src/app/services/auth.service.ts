import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/login-user';
import { JwtDTO } from '../models/jwt';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { BYPASS } from '../interceptors/user-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = this.checkLoginStatus();

  URL='http://localhost:8080/api/auth'

  constructor(
    private http:HttpClient,
    private tokenService:TokenService,
    private router:Router
    ) {
      this.checkLoginStatus();
    }
  
  public checkLoginStatus(): boolean {
    let roles: string[] = this.tokenService.getAuthorities();
    if (this.tokenService.getToken() == null) { window.sessionStorage.clear(); return false };
    
    if (roles.includes('ADMIN')) {
      return true;
    } else {
      return false;
    }
  }

  public login(loginUser: LoginUser): void {
    this.http.post<JwtDTO>(`${this.URL}/login`, loginUser,
                              {context: new HttpContext().set(BYPASS, true)}
    ).subscribe({
      next: (response: JwtDTO) => {
        let decodedToken = this.tokenService.decodeToken(response.token);
        this.tokenService.setToken(response.token);
        this.tokenService.setAuthorities(decodedToken.roles);
        if (JSON.stringify(decodedToken.roles).includes('ADMIN')) {
          this.isLoggedIn = true;
        }
        this.router.navigate(['/portfolio']);
      },
      error: (err: any) => {
        console.log(err);
        window.sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  public logout(): void {
    window.sessionStorage.clear();
  }

}
