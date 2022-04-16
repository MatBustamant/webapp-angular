import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Persona } from "../models";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url="https://localhost:8080/api/users"

  constructor( private http:HttpClient ) { }

  getPersona(): Observable<Persona> {
    return this.http.get<Persona>(this.url + '/read/1');
  }

  updatePersona(persona:Persona):Observable<Persona> {
    return this.http.put<Persona>(this.url + '/update', persona)
  }
}