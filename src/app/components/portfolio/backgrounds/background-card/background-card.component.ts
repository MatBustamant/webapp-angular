import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundRead } from 'src/app/models';
import { AuthService, DataHandlerService, ModalManagementService } from 'src/app/services';

@Component({
  selector: 'app-background-card',
  templateUrl: './background-card.component.html',
  styleUrls: ['./background-card.component.css', '../../../base-card/base-card.css']
})
export class BackgroundCardComponent implements OnInit, OnDestroy {

  @Input() odd!: boolean;

  isAdmin: boolean = false;

  subscription: Subscription;

  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();
  @Input() type!: string;
  @Input() data!: BackgroundRead;

  constructor(
    private authService: AuthService,
    private modalManagement: ModalManagementService,
    private dataHandler: DataHandlerService
  ) {
    this.isAdmin = this.authService.isAdmin();
    this.subscription = this.dataHandler.background.subscribe(
      background => {
        if (background.id == this.data.id) { this.data = background }
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

  openForm(data: BackgroundRead): void {
    this.modalManagement.openBackground(data, data.linkedType.id);
  }

  deleteBackground(id: number): void{
    this.dataHandler.updateInstitutions(this.data.institution, false);
    this.modalManagement.warning().subscribe(
      (value) => {
        if (value == 'Ok') {
          this.deleteId.emit(id);
        }
      }
    );
  }

}
