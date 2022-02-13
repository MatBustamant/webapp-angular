import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webapp-angular';
  
  genArray(number: number): Array<number> {
    return Array(number);
  }
}
