import { createReducer, on } from '@ngrx/store';
import { VaultItem } from 'src/app/shared/interfaces/VaultItem';
import { addToVault, clearVault, createVault } from '../action/vault.action';

const vault: VaultItem[] = [];
export const vaultReducer=createReducer(
  vault,
  on(createVault, (state:VaultItem[], { userVault }) => {
    return userVault;
  }),
  on(addToVault, (state:VaultItem[], { vaultItem }) => {
    return [...state, vaultItem];
  }),
  on(clearVault, (state:VaultItem[]) => {
    return [];
  })
);
