import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonaRead, ProjectRead } from 'src/app/models';
import { CRUDService, ModalManagementService, PersonaService } from 'src/app/services';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  projectList!: ProjectRead[];

  constructor(
    private personaService:PersonaService,
    private modalManagement:ModalManagementService,
    private crud:CRUDService
  ) { }

  ngOnInit(): void {
    this.loadSection();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadSection(): void {
    this.subscription = this.personaService.persona.subscribe({
      next: (persona: PersonaRead) => {
        this.projectList = persona.projectList;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  delete(id: number): void {
    this.personaService.deleteProject(id).subscribe({
      next: () => {
        this.projectList = this.projectList.filter(skill => skill.id != id);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  createProject() {
    this.modalManagement.openProject(null).subscribe(
      project => this.crud.createProject(project).subscribe({
        next: (project: ProjectRead) => {
          this.projectList.push(project);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    );
  }

}
