import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  let path = route.routeConfig?.path;
  let authPaths = ['login', 'register', ''];
  if (authService.isLoggedIn() && !authService.isTokenExpired()) {
    //user already logged in and token not expired

    if (authPaths?.includes(path as string)) {
      //if user tries to go to /login or /register, redirect to catalog

      router.navigate(['/catalog']);
      return false;
    }

    //else redirect to its own page
    return true;
  } else {
    //user not logged in

    //allow him to go to authPaths, if he wants
    if (authPaths?.includes(path as string)) return true;

    //else redirect to base '' landingPage
    authService.clearToken();
    router.navigate(['/']);
    return false;
  }
};
