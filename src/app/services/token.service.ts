import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decodedJWT } from '../models';

const TOKEN_KEY = 'AuthToken';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  helper = new JwtHelperService();

  constructor() { }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    let token = sessionStorage.getItem(TOKEN_KEY);
    if (token == null) { return null };
    let decoded = this.decodeToken(token);
    if (this.isTokenExpired(decoded)) { return null };
    return token;
  }

  public decodeToken(token: string): decodedJWT {
    return this.helper.decodeToken(token);
  }

  public isTokenExpired(token: decodedJWT): boolean {
    let exp = new Date(token.exp*1000);
    let now = new Date();
    if (now > exp) { return true }
    else { return false };
  }

  public setAuthorities(authorities: [{authority: string}]): void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    let roles: string[] = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach
        ((authority: {authority: string}) => {
          roles.push(authority.authority);
      });
    }
    return roles;
  }

}
