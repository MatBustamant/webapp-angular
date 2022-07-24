import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const realRole = this.authService.isAdmin() ? 'admin' : 'user';
 
    if (!this.authService.isLoggedIn() || expectedRole.indexOf(realRole) < 0) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
