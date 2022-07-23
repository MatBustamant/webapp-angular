import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { UserGuard as guard } from './guards';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'portfolio', component: PortfolioComponent, canActivate: [guard], data: { expectedRole: ['admin', 'user'] } },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling:'enabled',
    scrollOffset:[0,0] //LUEGO TOQUETEAR ESTO XFAVOR
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
