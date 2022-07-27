import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AboutFormComponent, AboutMeComponent, BackgroundCardComponent, BackgroundFormComponent, BackgroundsComponent, 
  BaseFormComponent, ButtonComponent, CollapsableNavbarComponent, HeaderComponent, LoginComponent,
  PortfolioComponent, ProjectCardComponent, ProjectFormComponent, ProjectsComponent, SkillCardComponent,
  SkillFormComponent, SkillGroupComponent, SkillsComponent, TopBarComponent, WarningComponent
} from './components';
import { interceptorProvider } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    CollapsableNavbarComponent,
    ButtonComponent,
    BackgroundCardComponent,
    LoginComponent,
    PortfolioComponent,
    AboutMeComponent,
    BackgroundsComponent,
    SkillsComponent,
    SkillCardComponent,
    SkillGroupComponent,
    BackgroundFormComponent,
    SkillFormComponent,
    AboutFormComponent,
    WarningComponent,
    ProjectsComponent,
    ProjectFormComponent,
    ProjectCardComponent,
    BaseFormComponent
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
