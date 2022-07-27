import { Component, Input, OnInit } from '@angular/core';
import { BackgroundRead, PersonaRead } from 'src/app/models';
import { AuthService, CRUDService, DataHandlerService, ModalManagementService } from 'src/app/services';

@Component({
  selector: 'app-section',
  templateUrl: './backgrounds.component.html',
  styleUrls: ['./backgrounds.component.css']
})
export class BackgroundsComponent implements OnInit {

  isAdmin: boolean = false;

  @Input() sectionTitle!: string;
  typeId!: number;
  backgroundList!: BackgroundRead[];

  constructor(
    private authService:AuthService,
    private dataHandler:DataHandlerService,
    private modalManagement:ModalManagementService,
    private crud:CRUDService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadSection(); 
  }

  convertToValid(string: string): string {
    const url = string.toLowerCase();
    return url.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }

  loadSection(): void {
    this.dataHandler.persona.subscribe({
      next: (persona: PersonaRead) => {
        // console.log(`La sección '${this.sectionTitle}' recibió la información.`);
        this.filterLists(persona);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterLists(persona: PersonaRead): void {
    switch (this.sectionTitle) {
      case "Educación":
        this.typeId = 1;
        this.backgroundList = persona.backgroundList.filter((background: BackgroundRead) => background.linkedType.id === 1);
        break;
      case "Experiencia":
        this.typeId = 2;
        this.backgroundList = persona.backgroundList.filter((background: BackgroundRead) => background.linkedType.id === 2);
        break;
    }
  }

  deleteBackground(id: number): void {
    this.crud.deleteBackground(id).subscribe({
      next: () => {
        this.backgroundList = this.backgroundList.filter(background => background.id != id);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  createBackground(type: number) {
    this.modalManagement.openBackground(null, type).subscribe(
      background => this.crud.createBackground(background).subscribe({
        next: (background: BackgroundRead) => {
          this.dataHandler.updateInstitutions(background.institution, true);
          this.backgroundList.push(background);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    );
  }

}
