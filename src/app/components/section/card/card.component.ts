import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundRead, ProjectRead } from 'src/app/models';
import { ModalManagementService, PersonaService } from 'src/app/services';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  subscription: Subscription

  img = 'https://via.placeholder.com/150';

  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();

  @Input() data!: BackgroundRead;

  constructor(
    private modalManagement: ModalManagementService,
    private personaService: PersonaService
  ) {
    this.subscription = this.personaService.background.subscribe(
      background => {
        if (background.id == this.data.id) { this.data = background }
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  openModal(): void {
    this.modalManagement.data.next(this.data);
    this.modalManagement.openModal();
  }

  openForm(data: BackgroundRead): void {
    this.modalManagement.openBackground(data, data.linkedType.id);
  }

  deleteBackground(id: number): void{
    this.modalManagement.warning().subscribe(
      (value) => {
        if (value == 'Ok') {
          this.deleteId.emit(id);
        }
      }
    );
  }

}
