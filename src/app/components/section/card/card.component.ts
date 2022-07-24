import { Component, Input } from '@angular/core';
import { ModalManagementService } from 'src/app/services';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  cardImg: string = "https://via.placeholder.com/150";
  @Input() cardTitle: string = "Sample Card";
  @Input() cardShort: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, repudiandae aliquid! Quos impedit, mollitia similique minus voluptatem cupiditate iure dignissimos.";
  cardFooter: string ="&copy; Copyright 20.., Example Corporation"

  constructor( private modalManagement: ModalManagementService ) { }

  openModal(): void {
    this.modalManagement.data.next({img: this.cardImg, title: this.cardTitle, description: this.cardShort, footer: this.cardFooter});
    this.modalManagement.openModal();
  }

}
