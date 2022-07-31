import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Background, BackgroundRead, Persona, PersonaRead, Project, ProjectRead, Skill, SkillRead } from '../models';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  public institutionList: string[] = [];
  public persona: Subject<PersonaRead> = new Subject<PersonaRead>();

  public about: Subject<PersonaRead> = new Subject<PersonaRead>();
  public background: Subject<BackgroundRead> = new Subject<BackgroundRead>();
  public skill: Subject<SkillRead> = new Subject<SkillRead>();
  public project: Subject<ProjectRead> = new Subject<ProjectRead>();
  private _refreshSkills$ = new Subject<void>();

  constructor( private crud: CRUDService ) {
    this.loadPersona();
  }

  get refreshSkill$() {
    return this._refreshSkills$;
  }

  loadInstitutions(persona: PersonaRead): void {
    persona.backgroundList.forEach(element => {
      let institution = element.institution; 
      if (institution != null && institution != "") {
          this.institutionList.push(institution);
      }
    });
  }

  updateInstitutions(institution: string, justCreated: boolean): void {
    if (!justCreated) {
      const i = this.institutionList.indexOf(institution);
      if (i >= 0) {this.institutionList.splice(i, 1)}
    } else { this.institutionList.push(institution) }
  }

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

  public editAbout(persona: Persona): void {
    this.crud.updatePersona(persona).subscribe({
      next: (response: PersonaRead) => {
        this.about.next(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  public editBackground(background: Background): void {
    this.crud.updateBackground(background).subscribe({
      next: (response: BackgroundRead) => {
        this.background.next(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
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
    });
  }

  public editProject(project: Project): void {
    this.crud.updateProject(project).subscribe({
      next: (response: ProjectRead) => {
        this.project.next(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  
}
