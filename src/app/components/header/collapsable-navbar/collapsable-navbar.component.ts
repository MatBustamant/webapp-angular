import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services';

@Component({
  selector: 'app-collapsable-navbar',
  templateUrl: './collapsable-navbar.component.html',
  styleUrls: ['./collapsable-navbar.component.css']
})
export class CollapsableNavbarComponent implements OnInit, OnDestroy {

  isNavbarCollapsed: boolean = true;
  subscription: Subscription;

  constructor( private uiService: UiService ) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.isNavbarCollapsed = value);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
