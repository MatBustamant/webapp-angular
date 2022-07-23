import { Component, OnInit } from '@angular/core';
import { PersonaRead } from 'src/app/models';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  fullname!: string;
  occupation!: String;
  description!: string;

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.loadSection()
  }

  loadSection(): void {
    this.personaService.persona.subscribe({
      next: (persona: PersonaRead) => {
        console.log("La sección 'Sobre mí' recibió la información.");
        this.fullname = `${persona.name} ${persona.surname}`;
        this.occupation = persona.occupation;
        this.description = persona.about.description;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
