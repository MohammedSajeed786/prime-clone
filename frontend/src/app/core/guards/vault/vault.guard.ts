import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { skipWhile, take, switchMap, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { VaultService } from 'src/app/features/vault/vault.service';

export const vaultGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const vaultService: VaultService = inject(VaultService);

  authService
    .getIsLoggedIn$()
    .pipe(
      // tap((res: boolean) => console.log(res)),
      skipWhile((authenticated) => !authenticated),
      take(1),
      switchMap(() => {
        vaultService.getVault();
        return of(true);
      })
    )
    .subscribe();

  return true;
};
