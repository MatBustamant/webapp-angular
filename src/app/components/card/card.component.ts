import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  cardImg: string = "https://via.placeholder.com/150";
  @Input() cardTitle: string = "Sample Card";
  cardShort: string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, repudiandae aliquid! Quos impedit, mollitia similique minus voluptatem cupiditate iure dignissimos.";

  constructor() { }

}
