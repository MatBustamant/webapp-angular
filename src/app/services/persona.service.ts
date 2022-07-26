import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Background, BackgroundRead, Persona, PersonaRead, Project, ProjectRead, Skill, SkillRead } from '../models';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public institutions: string[] = [];
  public persona: Subject<PersonaRead> = new Subject<PersonaRead>();
  public skill: Subject<SkillRead> = new Subject<SkillRead>();
  public project: Subject<ProjectRead> = new Subject<ProjectRead>();
  public background: Subject<BackgroundRead> = new Subject<BackgroundRead>();
  public sectionItem: Subject<any> = new Subject<any>();
  // public allSkills: Subject<Array<SkillRead>> = new Subject<Array<SkillRead>>();
  private _refreshSkills$ = new Subject<void>();
  // private _refreshSectionItems$ = new Subject<void>();

  constructor( private crud: CRUDService ) {
    this.loadPersona();
  }

  get refreshSkill$() {
    return this._refreshSkills$;
  }

  // get refreshSectionItems$() {
  //   return this._refreshSectionItems$;
  // }

  public loadPersona(): void {
    this.crud.getPersona().subscribe({
      next: (response: PersonaRead) => {
        this.persona.next(response);
        this.loadInstitutions(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  loadInstitutions(persona: PersonaRead): void {
    persona.backgroundList.forEach(element => {
      let institution = element.institution; 
      if (institution != null && institution != "") {
        if (!this.institutions.includes(institution)) {
          this.institutions.push(institution);
        }
      }
    });
    console.log(this.institutions);
  }

  public editPersona(persona: Persona): Observable<Persona> {
    return this.crud.updatePersona(persona);
  }

  public editSkill(skill: Skill, oldSkill: SkillRead): void {
    this.crud.updateSkill(skill).subscribe({
      next: (response: SkillRead) => {
        this.skill.next(response);
        if (skill.linkedType.id != oldSkill.linkedType.id) {
          this._refreshSkills$.next();
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  public updateSkills(): Observable<SkillRead[]> {
    return this.crud.getSkills()
  }

  public deleteSkill(id: number): Observable<any> {
    return this.crud.deleteSkill(id);
  }

  public editProject(project: Project): void {
    this.crud.updateProject(project).subscribe({
      next: (response: ProjectRead) => {
        this.project.next(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  public deleteProject(id: number): Observable<any> {
    return this.crud.deleteProject(id);
  }

  editBackground(background: Background): void {
    this.crud.updateBackground(background).subscribe({
      next: (response: BackgroundRead) => {
        this.background.next(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  public deleteBackground(id: number): Observable<any> {
    return this.crud.deleteBackground(id);
  }
  
}
