import { RecipesService } from './../../services/recipes.service';
import {
  MOCK_RECIPE_LIST,
  MOCK_RECIPES_SERVICE,
} from './../../mocks/recipes.mocks';
import { of } from 'rxjs';
import { RecipeEventService } from './../../services/recipe-event.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditRecipeButtonComponent } from './edit-recipe-button.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator';

describe('EditRecipeButtonComponent', () => {
  let component: EditRecipeButtonComponent;
  let spectator: Spectator<EditRecipeButtonComponent>;
  const mockRecipe = MOCK_RECIPE_LIST[0];

  const createComponent = createComponentFactory({
    component: EditRecipeButtonComponent,
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

  it('calls edit request when dialog closes', () => {
    spectator.inject(MatDialog).open.andReturn({
      afterClosed: () => of(mockRecipe),
    });
    spectator.detectChanges();
    component.openEditRecipeDialog();

    expect(spectator.component['recipesService'].update).toHaveBeenCalledWith(
      mockRecipe
    );
  });
});
