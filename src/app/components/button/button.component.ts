import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  switchState: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchOnAndOff() {
    this.switchState =!this.switchState;
  }

}


