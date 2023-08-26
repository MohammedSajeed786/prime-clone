import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { Response } from 'src/app/shared/interfaces/Response';
import { VaultItem } from 'src/app/shared/interfaces/VaultItem';
import { addToVault, clearVault, createVault } from 'src/app/store/action/vault.action';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VaultService {
  vaultUrl = environment.apiUrl + 'vault/';
  isVaultLoaded = false;
  vault$!: Observable<VaultItem[]>;

  constructor(
    private http: HttpClient,
    private store: Store<{ vault: VaultItem[] }>
  ) {
    this.vault$ = store.select('vault');
  }

  getVault() {
    if (!this.isVaultLoaded) {
      this.http
        .get<Response>(this.vaultUrl + 'all')
        .pipe(
          tap((res: Response) => {
            // console.log(res);
            this.store.dispatch(createVault({ userVault: res.data.vault }));
            this.isVaultLoaded = true;
          })
        )
        .subscribe();
    }
  }

  addToVault(vaultItemList: VaultItem[]) {
    vaultItemList.forEach((vaultItem) =>
      this.store.dispatch(
        addToVault({
          vaultItem: vaultItem,
        })
      )
    );
  }

  isPresentInVault(movieId: number): Observable<boolean> {
    return this.vault$.pipe(
      map((vault: VaultItem[]) => {
        return vault.find(
          (vaultItem: VaultItem) => vaultItem.movie.movieId == movieId
        ) != null;
      })
    );
  }

  clearVault(){
    this.store.dispatch(clearVault());
  }

  cleanUp(){
    this.clearVault();
    this.isVaultLoaded=false;

  }
}
