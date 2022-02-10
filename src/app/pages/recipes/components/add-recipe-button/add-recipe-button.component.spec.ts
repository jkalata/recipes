import { RecipesService } from './../../services/recipes.service';
import { RecipeEventService } from './../../services/recipe-event.service';
import {
  MOCK_RECIPE_LIST,
  MOCK_RECIPES_SERVICE,
} from './../../mocks/recipes.mocks';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddRecipeButtonComponent } from './add-recipe-button.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator';
import { of } from 'rxjs';

describe('AddRecipeButtonComponent', () => {
  let component: AddRecipeButtonComponent;
  let spectator: Spectator<AddRecipeButtonComponent>;

  const createComponent = createComponentFactory({
    component: AddRecipeButtonComponent,
    providers: [
      mockProvider(MatDialog),
      RecipeEventService,
      { provide: RecipesService, useValue: MOCK_RECIPES_SERVICE },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls add request on dialog close', () => {
    const mockRecipe = MOCK_RECIPE_LIST[0];
    spectator.inject(MatDialog).open.andReturn({
      afterClosed: () => of(mockRecipe),
    });

    component.openAddRecipeDialog();

    expect(spectator.component['recipesService'].create).toHaveBeenCalledWith(
      mockRecipe
    );
  });
});
