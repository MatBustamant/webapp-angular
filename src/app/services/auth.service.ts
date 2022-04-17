import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string="https://INSERTEPROVEEDORJWTAQUI/api/auth";
  currentUserSubject: BehaviorSubject<any>;

  constructor( private http:HttpClient ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'))
  }

  login(credenciales:any):Observable<any> {
    return this.http.post(this.url, credenciales).pipe(map(data=>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
  }

  get authUser() {
    return this.currentUserSubject.value;
  }
}