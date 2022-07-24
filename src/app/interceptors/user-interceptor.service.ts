import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, Observable, throwError } from 'rxjs';
import { JwtDTO } from '../models';
import { AuthService, TokenService } from '../services';

export const BYPASS = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root'
})
export class UserInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(BYPASS) == true) { return next.handle(req) };
    const token = this.tokenService.getToken();
    if (token == null) { return next.handle(req) };
    
    let interceptedReq = this.addToken(req, token);

    // PARA CHEQUEAR SI EL TOQUEN ESTÁ EXPIRADO Y OBTENER UNO NUEVO.
    return next.handle(interceptedReq).pipe(catchError(
      (err: HttpErrorResponse) => {
      if (this.tokenService.isTokenExpired(token) || err.status == 401 ) {
        const dto = {} as JwtDTO;
        dto.token = token;
        
        return this.authService.refreshToken(dto).pipe(concatMap(
          (response: JwtDTO) => {
            this.tokenService.setToken(response.token);
            interceptedReq = this.addToken(req, response.token);
            return next.handle(interceptedReq);
          }));
      
      } else {
        console.log(err);
        this.authService.logout();
        return throwError(() => err);
      }
    }));
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}`} });
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true}]
