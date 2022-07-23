import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  realRole!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const roles = this.tokenService.getAuthorities();
    this.realRole = 'user';
    roles.forEach(role => {
      if (role === 'ADMIN_ROLE') {
        this.realRole = 'admin';
      }
    });
    if (!this.tokenService.getToken() || expectedRole.indexOf(this.realRole) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
