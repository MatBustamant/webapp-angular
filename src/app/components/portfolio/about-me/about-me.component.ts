import { Component, OnInit } from '@angular/core';
import { Persona, PersonaRead } from 'src/app/models';
import { ModalManagementService, PersonaService } from 'src/app/services';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  data: Persona = {
    name: "",
    surname: "",
    occupation: "",
    about: "Bienvenido a mi portfolio web."
  }

  constructor(
    private personaService: PersonaService,
    private modalManagement: ModalManagementService
    ) { }

  ngOnInit(): void {
    this.loadSection()
  }

  loadSection(): void {
    this.personaService.persona.subscribe({
      next: (persona: PersonaRead) => {
        console.log("La sección 'Sobre mí' recibió la información.");
        this.setData(persona);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  setData(persona: Persona): void {
    this.data = persona;
    const fullname = `${persona.name} ${persona.surname}`
    if (persona.about == "") {
      this.data.about = `Bienvenido a mi portfolio web. Me llamo ${fullname} y esta es una presentación predeterminada.`;
    }
  }

  openForm(): void {
    this.modalManagement.data.next(this.data);
    this.modalManagement.openAbout();
  }

}
