import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonaRead, SkillRead } from 'src/app/models';
import { AuthService, CRUDService, DataHandlerService, ModalManagementService } from 'src/app/services';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;

  subscription: Subscription;

  skillList!: SkillRead[];
  hard!: SkillRead[];
  soft!: SkillRead[];
  lang!: SkillRead[];
  proglang!: SkillRead[];

  constructor(
    private authService:AuthService,
    private dataHandler: DataHandlerService,
    private crud: CRUDService,
    private modalManagement: ModalManagementService
    ) {
    this.isAdmin = this.authService.isAdmin();
    this.subscription = this.dataHandler.refreshSkill$.subscribe(() => {
      this.reloadSection();
    })
  }

  ngOnInit(): void {
    this.loadSection();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  loadSection(): void {
    this.dataHandler.persona.subscribe({
      next: (persona: PersonaRead) => {
        // console.log("La sección 'Habilidades' recibió la información.");
        this.skillList = persona.skillList;
        this.filterSkillList(persona.skillList);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  reloadSection(): void {
    this.crud.getSkills().subscribe({
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
    this.crud.deleteSkill(id).subscribe({
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
