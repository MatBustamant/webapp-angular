import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { end } from '@popperjs/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService:AuthService,
    private offcanvasService:NgbOffcanvas
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'start', scroll: true })
  }

}
