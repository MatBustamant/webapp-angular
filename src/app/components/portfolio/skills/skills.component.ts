import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonaRead, SkillRead } from 'src/app/models';
import { AuthService, CRUDService, DataHandlerService, ModalManagementService, ToastManagementService } from 'src/app/services';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;

  subscription!: Subscription;

  skillList!: SkillRead[];
  hard!: SkillRead[];
  soft!: SkillRead[];
  lang!: SkillRead[];
  proglang!: SkillRead[];

  constructor(
    private authService:AuthService,
    private dataHandler: DataHandlerService,
    private crud: CRUDService,
    private modalManagement: ModalManagementService,
    private toastService: ToastManagementService
    ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadSection();
    this.subscription = this.dataHandler.skill.subscribe(skill => this.updateSkill(skill));
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

  deleteSkill(id: number) {
    this.crud.deleteSkill(id).subscribe({
      next: () => {
        this.skillList = this.skillList.filter(skill => skill.id != id);
        this.filterSkillList(this.skillList);
        this.toastService.show("Elemento eliminado con éxito.", {classname: 'success'});
      },
      error: (err: any) => {
        this.toastService.show("Hubo un problema. No se pudo completar su acción.", {classname: 'error'});
        console.log(err);
      }
    });
  }

  updateSkill(skill: SkillRead) {
    for (let i = 0; i < this.skillList.length; i++) {
      const s = this.skillList[i];
      if (s.id == skill.id) {
        this.skillList[i] = skill;
      }
    }
    this.filterSkillList(this.skillList);
  }

  createSkill() {
    this.modalManagement.openSkill(null).subscribe(
      skill => this.crud.createSkill(skill).subscribe({
        next: (skill: SkillRead) => {
          this.skillList.push(skill);
          this.filterSkillList(this.skillList);
          this.toastService.show("Elemento creado con éxito.", {classname: 'success'});
        },
        error: (err: any) => {
          console.log(err);
          this.toastService.show("Hubo un problema. No se pudo completar su acción.", {classname: 'error'});
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
