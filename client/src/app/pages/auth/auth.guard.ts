import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      if (route.url[0]?.path === 'login' || route.url[0]?.path === 'register') {
        this.router.navigate(['/'])
        return false
      }
      return true
    } else {
      if (route.url[0]?.path === 'login' || route.url[0]?.path === 'register') {
        return true
      } else {
        this.router.navigate(['/login'])
        return false
      }
    }
  }
}
