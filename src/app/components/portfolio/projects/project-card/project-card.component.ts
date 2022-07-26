import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectRead } from 'src/app/models';
import { ModalManagementService, PersonaService } from 'src/app/services';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();

  @Input() data!: ProjectRead;

  constructor(
    private modalManagementService:ModalManagementService,
    private personaService:PersonaService
  ) { 
      this.subscription = this.personaService.project.subscribe(
        project => {
          if (project.id == this.data.id) { this.data = project }
        }
      )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  dateToString(date: Date | null): string {
    if (date == null) { return "Actualidad" }
    const fecha = new Date(date);
    return fecha.toLocaleDateString("es-AR", {year: 'numeric', month: 'long', day: 'numeric', timeZone: "UTC"});
  }

  getPeriod(date: Date, endDate: Date | null): string {
    const dateFrom = new Date(date);
    if (endDate == null) { endDate = new Date()}
    const dateTo = new Date(endDate);

    const months = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));

    if (months < 1) { return "Menos de 1 mes." }
    else if (months == 1) { return "1 mes." }
    else if (months < 12) { return `${months} meses.` }
    else if (months == 12) { return "1 año." }
    else if (months < 21) { return "Alrededor de 1 año." }
    else { return `Alrededor de ${(months - (months %12))/12} años.` }
  }

  deleteProject(id: number): void{
    this.modalManagementService.warning().subscribe(
      (value) => {
        if (value == 'Ok') {
          this.deleteId.emit(id);
        }
      }
    );
  }

  openForm(data: ProjectRead): void{
    this.modalManagementService.openProject(data);
  }

}
