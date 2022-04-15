import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TopBarComponent } from './components/header/top-bar/top-bar.component';
import { CollapsableNavbarComponent } from './components/header/collapsable-navbar/collapsable-navbar.component';
import { ButtonComponent } from './components/header/button/button.component';
import { BannerComponent } from './components/header/banner/banner.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    CollapsableNavbarComponent,
    ButtonComponent,
    BannerComponent,
    CardComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
