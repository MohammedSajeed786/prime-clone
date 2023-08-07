import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { CartService } from 'src/app/features/cart/cart.service';
import { map, skipWhile, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

export const cartGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const cartService: CartService = inject(CartService);

  authService
    .getIsLoggedIn$()
    .pipe(
      // tap((res: boolean) => console.log(res)),
      skipWhile((authenticated) => !authenticated),
      take(1),
      switchMap(() => {
        cartService.getCart();
        return of(true);
      })
    )
    .subscribe();

  return true;
};
