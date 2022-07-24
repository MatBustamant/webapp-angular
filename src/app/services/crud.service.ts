import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BackgroundRead, Persona, About, Institution, Project, Skill, PersonaRead, SkillRead, ProjectRead, Background } from "../models";

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  URL: string = environment.crudURL;

  constructor( private http:HttpClient ) { }

  // MÉTODOS CRUD
  // MÉTODOS PARA PERSONA ENTERA
  getPersona(): Observable<PersonaRead> {
    return this.http.get<PersonaRead>(`${this.URL}/person/read/1`);
  }

  updatePersona(persona:Persona):Observable<Persona> {
    return this.http.put<Persona>(`${this.URL}/person/update`, persona);
  }

  // MÉTODOS PARA SECCIÓN SOBRE MÍ
  getAbout(): Observable<About> {
    return this.http.get<About>(`${this.URL}/about/read/1`);
  }

  updateAbout(about:About):Observable<About> {
    return this.http.put<About>(`${this.URL}/about/update`, about);
  }

  deleteAbout(id: number):Observable<any> {
    return this.http.delete(`${this.URL}/about/delete/${id}`);
  }

  // MÉTODOS PARA BACKGROUND
  createBackground(background: Background):Observable<Background> {
    return this.http.post<Background>(`${this.URL}/background/create`, background);
  }

  getBackgroundsByType(type: number):Observable<Array<BackgroundRead>> {
    return this.http.get<Array<BackgroundRead>>(`${this.URL}/background/read/bt${type}`);
  }

  getBackgroundById(id: number):Observable<BackgroundRead> {
    return this.http.get<BackgroundRead>(`${this.URL}/background/read/${id}`);
  }

  updateBackground(background: Background):Observable<Background> {
    return this.http.put<Background>(`${this.URL}/background/update`, background);
  }

  deleteBackground(id: number):Observable<any> {
    return this.http.delete(`${this.URL}/background/delete/${id}`);
  }

  // MÉTODOS PARA INSTITUCIONES
  createInstitution(institution: Institution):Observable<Institution> {
    return this.http.post<Institution>(`${this.URL}/institution/create`, institution);
  }

  getInstitutions():Observable<Array<Institution>> {
    return this.http.get<Array<Institution>>(`${this.URL}/institution/read`);
  }

  getInstitutionById(id: number):Observable<Institution> {
    return this.http.get<Institution>(`${this.URL}/institution/read/${id}`);
  }

  updateInstitution(institution: Institution):Observable<Institution> {
    return this.http.put<Institution>(`${this.URL}/institution/update`, institution);
  }

  deleteInstitution(id: number):Observable<any> {
    return this.http.delete(`${this.URL}/institution/delete/${id}`);
  }

  // MÉTODOS PARA PROYECTOS
  createProject(project: Project):Observable<Project> {
    return this.http.post<Project>(`${this.URL}/project/create`, project);
  }

  getProjects():Observable<Array<ProjectRead>> {
    return this.http.get<Array<ProjectRead>>(`${this.URL}/project/read`);
  }

  getProjectById(id: number):Observable<ProjectRead> {
    return this.http.get<ProjectRead>(`${this.URL}/project/read/${id}`);
  }

  updateProject(project: Project):Observable<Project> {
    return this.http.put<Project>(`${this.URL}/project/update`, project);
  }

  deleteProject(id: number):Observable<any> {
    return this.http.delete(`${this.URL}/project/delete/${id}`);
  }

  // MÉTODOS PARA SKILLS
  createSkill(skill: Skill):Observable<Skill> {
    return this.http.post<Skill>(`${this.URL}/skill/create`, skill);
  }

  getSkillsByType(type: number):Observable<Array<SkillRead>> {
    return this.http.get<Array<SkillRead>>(`${this.URL}/skill/read/st${type}`);
  }

  getSkillById(id: number):Observable<SkillRead> {
    return this.http.get<SkillRead>(`${this.URL}/skill/read/${id}`);
  }

  updateSkill(skill: Skill):Observable<Skill> {
    return this.http.put<Skill>(`${this.URL}/skill/update`, skill);
  }

  deleteSkill(id: number):Observable<any> {
    return this.http.delete(`${this.URL}/skill/delete/${id}`);
  }
}