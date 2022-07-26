import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillRead } from 'src/app/models';
import { ModalManagementService, PersonaService } from 'src/app/services';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();

  @Input() data: SkillRead = {
    id: 0,
    linkedType: {id: 0, name:""},
    name: "Skill Sample Title",
    lvl: 0,
    image: "https://via.placeholder.com/50"
  }

  skillImg: string = "https://via.placeholder.com/50";
  progressLvl!: Record<string, string>;

  constructor(
    private modalManagement:ModalManagementService,
    private personaService:PersonaService,
  ) {
    this.subscription = this.personaService.skill.subscribe
    (skill => {
      if (skill.id == this.data.id) {
        this.data = skill;
        this.setProgressLvl();
      }
    })
  }

  ngOnInit(): void {
    this.setProgressLvl();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  setProgressLvl(): void {
    this.progressLvl = {
      'width': `${this.data.lvl*100}%`
    }
  }

  openForm(): void {
    this.modalManagement.openSkill(this.data);
  }

  deleteSkill(id: number): void {
    this.modalManagement.warning().subscribe(
      (value) => {
        if (value == 'Ok') {
          this.deleteId.emit(id);
        }
      }
    );
  }

}
