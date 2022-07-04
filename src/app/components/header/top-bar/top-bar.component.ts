import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isLogged:boolean = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() && this.tokenService.getAuthorities().includes('ADMIN')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public onLogOut(): void {
    this.tokenService.logOut();
  }

}
