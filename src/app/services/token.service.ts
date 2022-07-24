import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decodedJWT } from '../models';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private helper = new JwtHelperService();

  constructor() { }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | undefined {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token == null) { return undefined };
    return token;
  }

  public decodeToken(token: string): decodedJWT {
    return this.helper.decodeToken<decodedJWT>(token);
  }

  public isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    const exp = new Date(decoded.exp*1000);
    const now = new Date();
    if (now > exp) { return true }
    else { return false };
  }

  public getRoles(): string[] {
    const token = this.getToken();
    const roles: string[] = [];
    let decoded = {} as decodedJWT;

    if (token != null) { 
      decoded = this.decodeToken(token);
      decoded.roles.forEach((role: {authority: string}) => {
          roles.push(role.authority);
      });
    }
    return roles;
  }

}
