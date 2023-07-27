import { TestBed } from '@angular/core/testing';

import { MovieCatalogService } from './movie-catalog.service';

describe('MovieCatalogService', () => {
  let service: MovieCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
