import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Persona, PersonaRead } from 'src/app/models';
import { AuthService, DataHandlerService, ModalManagementService } from 'src/app/services';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;

  subscription: Subscription;

  data: Persona = {
    name: "",
    surname: "",
    occupation: "",
    about: "Bienvenido a mi portfolio web."
  }

  constructor(
    private authService: AuthService,
    private dataHandler: DataHandlerService,
    private modalManagement: ModalManagementService
    ) {
      this.isAdmin = this.authService.isAdmin();
      this.subscription = this.dataHandler.about.subscribe(
        about => this.setData(about)
      )
    }

  ngOnInit(): void {
    this.loadSection()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadSection(): void {
    this.dataHandler.persona.subscribe({
      next: (persona: PersonaRead) => {
        // console.log("La sección 'Sobre mí' recibió la información.");
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
    this.modalManagement.openAbout(this.data);
  }

}
