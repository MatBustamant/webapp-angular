import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components';
import { TopBarComponent } from './components';
import { CollapsableNavbarComponent } from './components';
import { ButtonComponent } from './components';
import { BannerComponent } from './components';
import { CardComponent } from './components';
import { ModalComponent } from './components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components';
import { PortfolioComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    CollapsableNavbarComponent,
    ButtonComponent,
    BannerComponent,
    CardComponent,
    ModalComponent,
    LoginComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
