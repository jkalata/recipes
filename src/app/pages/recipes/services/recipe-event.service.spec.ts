import { RecipeEventService } from './recipe-event.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('RecipeEventService', () => {
  let spectator: SpectatorService<RecipeEventService>;
  let service: RecipeEventService;

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
