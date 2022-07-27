import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundRead } from 'src/app/models';
import { AuthService, DataHandlerService, ModalManagementService } from 'src/app/services';

@Component({
  selector: 'app-card',
  templateUrl: './background-card.component.html',
  styleUrls: ['./background-card.component.css']
})
export class BackgroundCardComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;

  subscription: Subscription;

  img = 'https://via.placeholder.com/150';

  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();

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
