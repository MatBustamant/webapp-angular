import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BYPASS } from '../interceptors';
import { JwtDTO, LoginUser } from '../models';
import { ToastManagementService } from './toast-management.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  processingForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private URL: string = environment.authURL;

  constructor(
    private http:HttpClient,
    private tokenService:TokenService,
    private router:Router,
    private toastService:ToastManagementService
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
    this.processingForm.next(true);
    this.toastService.show("Por favor, espere un momento mientras se inicia sesión.");
    this.http.post<JwtDTO>(`${this.URL}/login`, loginUser,
                              {context: new HttpContext().set(BYPASS, true)}
    ).subscribe({
      next: (response: JwtDTO) => {
        this.toastService.show("Sesión iniciada con éxito.", {classname: 'success'});
        this.tokenService.setToken(response.token);
        this.router.navigateByUrl('/portfolio');
        this.processingForm.next(false);
      },
      error: (err: any) => {
        if (err.error.message == "Bad credentials") {
          console.log(err.error);
          this.toastService.show("Email o contraseña incorrectas.", {classname: 'error'})
        } else {
          console.log(err);
          this.toastService.show("Hubo un problema. Intente de nuevo en unos momentos.", {classname: 'error'});
        }
        console.log(err);
        this.processingForm.next(false);
        // this.logout();
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
