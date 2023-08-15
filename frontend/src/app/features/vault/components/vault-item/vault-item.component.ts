import { Component, Input } from '@angular/core';
import { VaultItem } from 'src/app/shared/interfaces/VaultItem';

@Component({
  selector: 'app-vault-item',
  templateUrl: './vault-item.component.html',
  styleUrls: ['./vault-item.component.css']
})
export class VaultItemComponent {

  @Input() vaultItem!: VaultItem;

}
