import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL='http://localhost:8080/api/auth/'

  constructor(private http:HttpClient) { }

  public login(loginUser: LoginUser): Observable<JwtDTO>{
    return this.http.post<JwtDTO>(this.URL + 'login', loginUser);
  }

}
