import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BYPASS } from '../interceptors';
import { JwtDTO, LoginUser } from '../models';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = environment.authURL;

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
