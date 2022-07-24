import { Component, Input, OnInit } from '@angular/core';
import { BackgroundRead, PersonaRead, ProjectRead } from 'src/app/models';
import { PersonaService } from 'src/app/services';

type SectionItem = BackgroundRead | ProjectRead;

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() sectionTitle!: string;
  sectionSwitch!: keyof PersonaRead;
  sectionList!: SectionItem[];

  constructor( private personaService: PersonaService ) { }

  ngOnInit(): void {
    this.loadSection(); 
  }

  convertToValid(string: string): string {
    const url = string.toLowerCase();
    return url.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }

  loadSection(): void {
    this.personaService.persona.subscribe({
      next: (persona: PersonaRead) => {
        console.log(`La sección '${this.sectionTitle}' recibió la información.`)
        switch (this.sectionTitle) {
          case "Experiencia":
            this.sectionSwitch = "backgroundList";
            const experienceList = persona[this.sectionSwitch];
            this.sectionList = experienceList.filter((background: BackgroundRead) => background.linkedType.id === 2);
            break;
          case "Educación":
            this.sectionSwitch = "backgroundList";
            const educationList = persona[this.sectionSwitch];
            this.sectionList = educationList.filter((background: BackgroundRead) => background.linkedType.id === 1);
            break;
          case "Proyectos":
            this.sectionSwitch = "projectList";
            this.sectionList = persona[this.sectionSwitch];
            break;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
