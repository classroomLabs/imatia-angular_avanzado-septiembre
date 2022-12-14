import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticatedGuard implements CanLoad, CanActivate {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canMove();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canMove();
  }

  private canMove(): boolean | UrlTree {
    if (this.authentication.user.isAuthenticated) return true;
    return this.redirectToLogin();
  }
  private redirectToLogin(): UrlTree {
    const navigationPath = ["auth", "login"];
    const returnUrl = this.router
      .getCurrentNavigation()
      ?.extractedUrl.toString();
    const navigationExtras = {
      queryParams: { returnUrl },
    };
    return this.router.createUrlTree(navigationPath, navigationExtras);
  }
}
