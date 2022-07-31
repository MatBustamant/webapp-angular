import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillRead } from 'src/app/models';
import { AuthService, DataHandlerService, ModalManagementService } from 'src/app/services';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit {

  isAdmin: boolean = false;

  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();

  @Input() data: SkillRead = {
    id: 0,
    linkedType: {id: 0, name:""},
    name: "Skill Sample Title",
    lvl: 0,
  }

  progressLvl!: Record<string, string>;

  constructor(
    private authService:AuthService,
    private modalManagement:ModalManagementService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.setProgressLvl();
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
