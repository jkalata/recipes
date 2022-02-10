import { take } from 'rxjs';
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

  it('emits edited recipe', () => {
    service.emitEditEvent(mockRecipe);
    service
      .getEditObservable()
      .pipe(take(1))
      .subscribe((recipe) => {
        expect(recipe).toEqual(mockRecipe);
      });
  });

  it('emits edited recipe', () => {
    service.emitDeleteEvent(mockRecipe._id);
    service
      .getDeleteObservable()
      .pipe(take(1))
      .subscribe((id) => {
        expect(id).toBe(mockRecipe._id);
      });
  });
});
