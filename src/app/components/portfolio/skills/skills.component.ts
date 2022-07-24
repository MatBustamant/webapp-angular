import { Component, OnInit } from '@angular/core';
import { PersonaRead, SkillRead } from 'src/app/models';
import { PersonaService } from 'src/app/services';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  hard!: SkillRead[];
  soft!: SkillRead[];
  lang!: SkillRead[];
  proglang!: SkillRead[];

  constructor( private personaService: PersonaService ) { }

  ngOnInit(): void {
    this.loadSection();
  }

  loadSection(): void {
    this.personaService.persona.subscribe({
      next: (persona: PersonaRead) => {
        console.log("La sección 'Habilidades' recibió la información.");
        const data: SkillRead[] = persona.skillList;
        this.hard = data.filter(skill => skill.linkedType.id == 1);
        this.soft = data.filter(skill => skill.linkedType.id == 2);
        this.lang = data.filter(skill => skill.linkedType.id == 3);
        this.proglang = data.filter(skill => skill.linkedType.id == 4);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
