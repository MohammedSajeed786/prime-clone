import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultItemComponent } from './vault-item.component';

describe('VaultItemComponent', () => {
  let component: VaultItemComponent;
  let fixture: ComponentFixture<VaultItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaultItemComponent]
    });
    fixture = TestBed.createComponent(VaultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
