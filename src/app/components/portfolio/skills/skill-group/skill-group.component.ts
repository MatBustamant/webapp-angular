import { Component, Input, OnInit } from '@angular/core';
import { SkillRead } from 'src/app/models';

@Component({
  selector: 'app-skill-group',
  templateUrl: './skill-group.component.html',
  styleUrls: ['./skill-group.component.css']
})
export class SkillGroupComponent implements OnInit {

  @Input() group!: SkillRead[];
  @Input() groupType!: string;
  @Input() groupTitle!: string;
  currentPage: number = 1;
  pageSize: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

  public onNext(page: number): void {
    const total = Math.ceil(this.group.length/this.pageSize);
    if (this.currentPage != total) {
      this.currentPage = page + 1;
    } else {
      this.currentPage = 1
    }
  }

  public onPrevious(page: number): void {
    const total = Math.ceil(this.group.length/this.pageSize);
    if (this.currentPage != 1) {
      this.currentPage = page - 1;
    } else {
      this.currentPage = total;
    }
  }

  public onGoBack(): void {
    this.currentPage = 1;
  }

}
