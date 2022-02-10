import { RecipeEventService } from './../../services/recipe-event.service';
import { RecipesService } from './../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator';
import { EditRecipeComponent } from './edit-recipe.component';

describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent;
  let spectator: Spectator<EditRecipeComponent>;
  const mockActivatedRoute = {
    params: of([{ id: '1' }]),
  };
  const createComponent = createComponentFactory({
    component: EditRecipeComponent,
    providers: [
      { provide: ActivatedRoute, useValue: mockActivatedRoute },
      mockProvider(RecipesService),
      RecipeEventService,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
