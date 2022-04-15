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
  cardLong: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo debitis quia rerum suscipit nesciunt, fuga atque impedit alias nisi sapiente consequatur, expedita eum quae et earum inventore temporibus quos ducimus molestias dignissimos velit, repellat placeat. Libero cupiditate eum alias voluptates officiis molestiae ab, sunt unde pariatur eos quo, ut nobis!.<br>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, repudiandae aliquid! Quos impedit, mollitia similique minus voluptatem cupiditate iure dignissimos.`;
  cardFooter: string ="&copy; Copyright 20.., Example Corporation"

  constructor() { }

}
