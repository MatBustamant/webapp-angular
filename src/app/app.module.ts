import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components';
import { TopBarComponent } from './components';
import { CollapsableNavbarComponent } from './components';
import { ButtonComponent } from './components';
import { CardComponent } from './components';
import { ModalComponent } from './components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components';
import { PortfolioComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { interceptorProvider } from './interceptors/user-interceptor.service';
import { AboutMeComponent } from './components';
import { SectionComponent } from './components/section/section.component';
import { SkillsComponent } from './components/portfolio/skills/skills.component';
import { SkillCardComponent } from './components/portfolio/skills/skill-card/skill-card.component';
import { SkillGroupComponent } from './components/portfolio/skills/skill-group/skill-group.component';

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
