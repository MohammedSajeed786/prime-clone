import { createAction, props } from '@ngrx/store';
import { VaultItem } from 'src/app/shared/interfaces/VaultItem';

export const createVault = createAction(
  'createVault',
  props<{ userVault: VaultItem[] }>()
);
export const addToVault = createAction(
  'addToVault',
  props<{ vaultItem: VaultItem }>()
);
export const clearVault = createAction('clearVault');
