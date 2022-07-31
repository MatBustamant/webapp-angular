import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonaRead, ProjectRead } from 'src/app/models';
import { AuthService, CRUDService, DataHandlerService, ModalManagementService, ToastManagementService } from 'src/app/services';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;

  subscription!: Subscription;

  projectList!: ProjectRead[];

  constructor(
    private authService:AuthService,
    private dataHandler:DataHandlerService,
    private modalManagement:ModalManagementService,
    private crud:CRUDService,
    private toastService:ToastManagementService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadSection();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadSection(): void {
    this.subscription = this.dataHandler.persona.subscribe({
      next: (persona: PersonaRead) => {
        this.projectList = persona.projectList;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  delete(id: number): void {
    this.crud.deleteProject(id).subscribe({
      next: () => {
        this.projectList = this.projectList.filter(skill => skill.id != id);
        this.toastService.show("Elemento eliminado con éxito.", {classname: 'success'});
      },
      error: (err: any) => {
        this.toastService.show("Hubo un problema. No se pudo completar su acción.", {classname: 'error'});
        console.log(err);
      }
    });
  }

  createProject() {
    this.modalManagement.openProject(null).subscribe(
      project => this.crud.createProject(project).subscribe({
        next: (project: ProjectRead) => {
          this.projectList.push(project);
          this.toastService.show("Elemento creado con éxito.", {classname: 'success'});
        },
        error: (err: any) => {
          this.toastService.show("Hubo un problema. No se pudo completar su acción.", {classname: 'error'});
          console.log(err);
        }
      })
    );
  }

}
