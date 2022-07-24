import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, PortfolioComponent } from './components';
import { UserGuard } from './guards';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'portfolio', component: PortfolioComponent, canActivate: [UserGuard], data: { expectedRole: ['admin', 'user'] } },
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
