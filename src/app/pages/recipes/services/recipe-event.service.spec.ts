import { MOCK_RECIPE_LIST } from './../mocks/recipes.mocks';
import { RecipeEventService } from './recipe-event.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('RecipeEventService', () => {
  let spectator: SpectatorService<RecipeEventService>;
  let service: RecipeEventService;

  const mockRecipe = MOCK_RECIPE_LIST[0];
  const createService = createServiceFactory({
    service: RecipeEventService,
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
