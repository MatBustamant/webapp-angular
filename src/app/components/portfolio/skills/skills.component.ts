import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonaRead, Skill, SkillRead } from 'src/app/models';
import { CRUDService, ModalManagementService, PersonaService } from 'src/app/services';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  subscription: Subscription;

  skillList!: SkillRead[];
  hard!: SkillRead[];
  soft!: SkillRead[];
  lang!: SkillRead[];
  proglang!: SkillRead[];

  currentPage: number = 1;
  pageSize: number = 3;

  constructor(
    private personaService: PersonaService,
    private crud: CRUDService,
    private modalManagement: ModalManagementService
    ) {
    this.subscription = this.personaService.refreshSkill$.subscribe(() => {
      this.reloadSection();
    })
  }

  ngOnInit(): void {
    this.loadSection();
  }

  loadSection(): void {
    this.personaService.persona.subscribe({
      next: (persona: PersonaRead) => {
        console.log("La sección 'Habilidades' recibió la información.");
        this.skillList = persona.skillList;
        this.filterSkillList(persona.skillList);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  reloadSection(): void {
    // console.log('reloading');
    this.personaService.updateSkills().subscribe({
      next: (response: SkillRead[]) => {
        this.skillList = response;
        this.filterSkillList(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  deleteSkill(id: number) {
    this.personaService.deleteSkill(id).subscribe({
      next: () => {
        this.skillList = this.skillList.filter(skill => skill.id != id);
        this.filterSkillList(this.skillList);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  createSkill() {
    this.modalManagement.openSkill(null).subscribe(
      skill => this.crud.createSkill(skill).subscribe({
        next: (skill: SkillRead) => {
          this.skillList.push(skill);
          this.filterSkillList(this.skillList);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    );
  }

  filterSkillList(skills: SkillRead[]): void {
    this.hard = skills.filter(skill => skill.linkedType.id == 1);
    this.soft = skills.filter(skill => skill.linkedType.id == 2);
    this.lang = skills.filter(skill => skill.linkedType.id == 3);
    this.proglang = skills.filter(skill => skill.linkedType.id == 4);
  }

}
