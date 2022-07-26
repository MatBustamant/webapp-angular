import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AboutMeComponent, ButtonComponent, CardComponent, CollapsableNavbarComponent, HeaderComponent,
  LoginComponent, PortfolioComponent, SectionComponent, SkillCardComponent,
  SkillGroupComponent, SkillsComponent, TopBarComponent
} from './components';
import { FormComponent } from './components/modal/form/form.component';
import { AboutFormComponent } from './components/portfolio/about-me/about-form/about-form.component';
import { ProjectFormComponent } from './components/portfolio/projects/project-form/project-form.component';
import { ProjectsComponent } from './components/portfolio/projects/projects.component';
import { SkillFormComponent } from './components/portfolio/skills/skill-form/skill-form.component';
import { WarningComponent } from './components/warning/warning.component';
import { interceptorProvider } from './interceptors';
import { ProjectCardComponent } from './components/portfolio/projects/project-card/project-card.component';
import { BaseFormComponent } from './components/base-form/base-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    CollapsableNavbarComponent,
    ButtonComponent,
    CardComponent,
    LoginComponent,
    PortfolioComponent,
    AboutMeComponent,
    SectionComponent,
    SkillsComponent,
    SkillCardComponent,
    SkillGroupComponent,
    FormComponent,
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
