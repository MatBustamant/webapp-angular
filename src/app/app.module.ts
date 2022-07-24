import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AboutMeComponent, ButtonComponent, CardComponent, CollapsableNavbarComponent, HeaderComponent,
  LoginComponent, ModalComponent, PortfolioComponent, SectionComponent, SkillCardComponent,
  SkillGroupComponent, SkillsComponent, TopBarComponent
} from './components';
import { interceptorProvider } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    CollapsableNavbarComponent,
    ButtonComponent,
    CardComponent,
    ModalComponent,
    LoginComponent,
    PortfolioComponent,
    AboutMeComponent,
    SectionComponent,
    SkillsComponent,
    SkillCardComponent,
    SkillGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
