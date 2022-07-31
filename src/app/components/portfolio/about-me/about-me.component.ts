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

  subscription!: Subscription;

  data: Persona = {
    name: "",
    surname: "",
    occupation: "",
    image: ""
  }

  constructor(
    private authService: AuthService,
    private dataHandler: DataHandlerService,
    private modalManagement: ModalManagementService
    ) {
      this.isAdmin = this.authService.isAdmin();
    }

  ngOnInit(): void {
    this.loadSection();
    this.subscription = this.dataHandler.about.subscribe(
      about => this.data = about
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadSection(): void {
    this.dataHandler.persona.subscribe({
      next: (persona: PersonaRead) => {
        // console.log("La sección 'Sobre mí' recibió la información.");
        this.data = persona;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  openForm(): void {
    this.modalManagement.openAbout(this.data);
  }

}
