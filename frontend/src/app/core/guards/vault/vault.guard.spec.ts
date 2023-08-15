import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { vaultGuard } from './vault.guard';

describe('vaultGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => vaultGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
