import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectRead } from 'src/app/models';
import { AuthService, DataHandlerService, ModalManagementService } from 'src/app/services';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css', '../../../base-card/base-card.css']
})
export class ProjectCardComponent implements OnInit, OnDestroy {

  @Input() odd!: boolean;

  isAdmin: boolean = false;

  subscription: Subscription;

  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();

  @Input() data!: ProjectRead;

  constructor(
    private authService:AuthService,
    private modalManagement:ModalManagementService,
    private dataHandler:DataHandlerService
  ) { 
      this.isAdmin = this.authService.isAdmin();
      this.subscription = this.dataHandler.project.subscribe(
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

  dateToString(date: string | null): string {
    if (date == null) { return "Actualidad" }
    const fecha = new Date(date);
    return fecha.toLocaleDateString("es-AR", {year: 'numeric', month: 'long', day: 'numeric', timeZone: "UTC"});
  }

  getPeriod(date: string, endDate: any): string {
    const dateFrom = new Date(date);
    if (endDate == null) { endDate = new Date()}
    const dateTo = new Date(endDate);

    const months = dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));

    if (months < 1) {
      const days = dateTo.getDate() - dateFrom.getDate() - 1;
      return days <= 1 ? "1 día" : `${days} días`;
    }
    else if (months == 1) { return "1 mes" }
    else if (months < 12) { return `${months} meses` }
    else if (months == 12) { return "1 año" }
    else if (months < 21) { return "Alrededor de 1 año" }
    else { return `${(months - (months %12))/12} años` }
  }

  deleteProject(id: number): void{
    this.modalManagement.warning().subscribe(
      (value) => {
        if (value == 'Ok') {
          this.deleteId.emit(id);
        }
      }
    );
  }

  openForm(data: ProjectRead): void{
    this.modalManagement.openProject(data);
  }

}
