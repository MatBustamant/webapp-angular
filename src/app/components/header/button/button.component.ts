import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  switchState: boolean = false;
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

  switchOnAndOff() {
    this.switchState = !this.switchState;
    this.uiService.toggleCollapse();
  }

}


