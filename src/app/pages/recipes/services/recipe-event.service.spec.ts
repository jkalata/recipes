import { TestBed } from '@angular/core/testing';

import { RecipeEventService } from './recipe-event.service';

describe('RecipeEventService', () => {
  let service: RecipeEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
