import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AboutFormComponent, AboutMeComponent,
  BackgroundCardComponent, BackgroundFormComponent, BackgroundsComponent, BaseFormComponent, 
  LoginComponent, NavbarComponent,
  PortfolioComponent, ProjectCardComponent, ProjectFormComponent, ProjectsComponent, SkillCardComponent,
  SkillFormComponent, SkillGroupComponent, SkillsComponent, WarningComponent
} from './components';
import { interceptorProvider } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
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
    BaseFormComponent,
    NavbarComponent
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
