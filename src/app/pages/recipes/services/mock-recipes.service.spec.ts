import { TestBed } from '@angular/core/testing';

import { MockRecipesService } from './mock-recipes.service';

describe('MockRecipesService', () => {
  let service: MockRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
