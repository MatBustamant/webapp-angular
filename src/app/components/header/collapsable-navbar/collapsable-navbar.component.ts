import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-collapsable-navbar',
  templateUrl: './collapsable-navbar.component.html',
  styleUrls: ['./collapsable-navbar.component.css']
})
export class CollapsableNavbarComponent implements OnInit {

  isNavbarCollapsed: boolean = true;
  subscription?: Subscription;

  constructor(
    private uiService: UiService
  ) {
    this.subscription = this.uiService.onToggle()
                                                  .subscribe(value => this.isNavbarCollapsed = value);
   }

  ngOnInit(): void {
  }

}
