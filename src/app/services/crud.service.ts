import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
// import { environment } from "src/environments/environment";
import {
  Background, BackgroundRead, Persona, PersonaRead,
  Project, ProjectRead, Skill, SkillRead
} from "../models";

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  private URL: string = 'https://portfolio-back-s.herokuapp.com/api/portfolio';

  constructor( private http:HttpClient ) { }

  // MÉTODOS CRUD
  // MÉTODOS PARA PERSONA ENTERA
  getPersona(): Observable<PersonaRead> {
    return this.http.get<PersonaRead>(`${this.URL}/person/read/1`);
  }

  updatePersona(persona:Persona):Observable<PersonaRead> {
    return this.http.put<PersonaRead>(`${this.URL}/person/update`, persona);
  }


  // MÉTODOS PARA BACKGROUND
  createBackground(background: Background):Observable<BackgroundRead> {
    return this.http.post<BackgroundRead>(`${this.URL}/background/create`, background);
  }

  getBackgroundsByType(type: number):Observable<Array<BackgroundRead>> {
    return this.http.get<Array<BackgroundRead>>(`${this.URL}/background/read/bt${type}`);
  }

  getBackgroundById(id: number):Observable<BackgroundRead> {
    return this.http.get<BackgroundRead>(`${this.URL}/background/read/${id}`);
  }

  updateBackground(background: Background):Observable<BackgroundRead> {
    return this.http.put<BackgroundRead>(`${this.URL}/background/update`, background);
  }

  deleteBackground(id: number):Observable<any> {
    return this.http.delete(`${this.URL}/background/delete/${id}`);
  }


  // MÉTODOS PARA PROYECTOS
  createProject(project: Project):Observable<ProjectRead> {
    return this.http.post<ProjectRead>(`${this.URL}/project/create`, project);
  }

  getProjects():Observable<Array<ProjectRead>> {
    return this.http.get<Array<ProjectRead>>(`${this.URL}/project/read`);
  }

  getProjectById(id: number):Observable<ProjectRead> {
    return this.http.get<ProjectRead>(`${this.URL}/project/read/${id}`);
  }

  updateProject(project: Project):Observable<ProjectRead> {
    return this.http.put<ProjectRead>(`${this.URL}/project/update`, project);
  }

  deleteProject(id: number):Observable<any> {
    return this.http.delete(`${this.URL}/project/delete/${id}`);
  }


  // MÉTODOS PARA SKILLS
  createSkill(skill: Skill):Observable<SkillRead> {
    return this.http.post<SkillRead>(`${this.URL}/skill/create`, skill);
  }

  getSkills():Observable<Array<SkillRead>> {
    return this.http.get<Array<SkillRead>>(`${this.URL}/skill/read`);
  }

  getSkillsByType(type: number):Observable<Array<SkillRead>> {
    return this.http.get<Array<SkillRead>>(`${this.URL}/skill/read/st${type}`);
  }

  getSkillById(id: number):Observable<SkillRead> {
    return this.http.get<SkillRead>(`${this.URL}/skill/read/${id}`);
  }

  updateSkill(skill: Skill):Observable<SkillRead> {
    return this.http.put<SkillRead>(`${this.URL}/skill/update`, skill);
  }

  deleteSkill(id: number):Observable<any> {
    return this.http.delete<any>(`${this.URL}/skill/delete/${id}`);
  }

}
