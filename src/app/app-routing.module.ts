import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, PortfolioComponent } from './components';
import { UserGuard } from './guards';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'portfolio', component: PortfolioComponent, canActivate: [UserGuard], data: { expectedRole: ['admin', 'user'] } },
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path: '**', redirectTo:'/portfolio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
