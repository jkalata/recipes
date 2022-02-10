import { MockRecipesService } from './../../services/mock-recipes.service';
import { RecipesService } from './../../services/recipes.service';
import { of } from 'rxjs';
import {
  MOCK_RECIPE_LIST,
  MOCK_RECIPES_SERVICE,
} from './../../mocks/recipes.mocks';
import { RecipeEventService } from './../../services/recipe-event.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteRecipeButtonComponent } from './delete-recipe-button.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator';

describe('DeleteRecipeButtonComponent', () => {
  let component: DeleteRecipeButtonComponent;
  let spectator: Spectator<DeleteRecipeButtonComponent>;

  const mockRecipe = MOCK_RECIPE_LIST[0];
  const createComponent = createComponentFactory({
    component: DeleteRecipeButtonComponent,
    imports: [MatDialogModule],
    providers: [
      RecipeEventService,
      mockProvider(MatDialog),
      { provide: RecipesService, useValue: MOCK_RECIPES_SERVICE },
    ],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        recipe: mockRecipe,
      },
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls delete request when dialog closes', () => {
    spectator.inject(MatDialog).open.andReturn({
      afterClosed: () => of(true),
    });
    component.openConfirmDialog();

    expect(spectator.component['recipesService'].delete).toHaveBeenCalledWith(
      mockRecipe._id
    );
  });
});
