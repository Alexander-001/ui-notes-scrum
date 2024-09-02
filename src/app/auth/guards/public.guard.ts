import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkPublicStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap(() => {}),
    tap((isAuthenticated: boolean) => {
      if (isAuthenticated) router.navigate(['/']);
    }),
    map((isAuthenticated: boolean) => !isAuthenticated)
  );
};

export const canMatchPublicGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return checkPublicStatus();
};

export const canActivatePublicGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkPublicStatus();
};
