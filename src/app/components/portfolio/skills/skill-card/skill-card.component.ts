import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit {

  /*@Input()*/ skillImg: string = "https://via.placeholder.com/50";
  @Input() skillTitle: string = "Skill Sample Title"
  @Input() skillLvl: any = 0;
  progressLvl!: Record<string, string>;

  constructor() { }

  ngOnInit(): void {
    this.setProgressLvl();
  }

  setProgressLvl(): void {
    this.progressLvl = {
      'width': `${this.skillLvl*100}%`
    }
  }

}
