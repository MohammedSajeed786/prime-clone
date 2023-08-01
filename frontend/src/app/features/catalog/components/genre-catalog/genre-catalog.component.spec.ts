import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCatalogComponent } from './genre-catalog.component';

describe('GenreCatalogComponent', () => {
  let component: GenreCatalogComponent;
  let fixture: ComponentFixture<GenreCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreCatalogComponent]
    });
    fixture = TestBed.createComponent(GenreCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
