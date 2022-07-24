import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/login-user';
import { JwtDTO } from '../models/jwt';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { BYPASS } from '../interceptors/user-interceptor.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL: string = environment.authURL;

  constructor(
    private http:HttpClient,
    private tokenService:TokenService,
    private router:Router
    ) { }
  
  public isLoggedIn(): boolean {
    const token = this.tokenService.getToken();
    if (token == null) { return false }
    else { return true };
  }

  public isAdmin(): boolean {
    const roles: string[] = this.tokenService.getRoles();
    if (roles.includes('ADMIN')) { return true } 
    else { return false };
  }

  public login(loginUser: LoginUser): void {
    this.http.post<JwtDTO>(`${this.URL}/login`, loginUser,
                              {context: new HttpContext().set(BYPASS, true)}
    ).subscribe({
      next: (response: JwtDTO) => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/portfolio']);
      },
      error: (err: any) => {
        console.log(err);
        this.logout();
      }
    });
  }

  public logout(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public refreshToken(dto: JwtDTO): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(`${this.URL}/refresh`, dto,
                                    {context: new HttpContext().set(BYPASS, true)});
  }

}
