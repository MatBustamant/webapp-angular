import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.checkLoginStatus()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  public logout(): void {
    this.authService.logout();
  }

}
