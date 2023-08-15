import { Component } from '@angular/core';
import { VaultService } from '../../vault.service';
import { VaultItem } from 'src/app/shared/interfaces/VaultItem';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css'],
})
export class VaultComponent {
  vault$!: Observable<VaultItem[]>;

  constructor(
    private vaultService: VaultService,
    private store: Store<{ vault: VaultItem[] }>
  ) {
    this.vault$ = store.select('vault');
  }
}
