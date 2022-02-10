import { of } from 'rxjs';
import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
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
    providers: [RecipeEventService, mockProvider(MatDialog)],
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

  it('emits recipe id when dialog closes', () => {
    const eventSpy = spyOn(component['recipeEventService'], 'emitDeleteEvent');
    spectator.inject(MatDialog).open.andReturn({
      afterClosed: () => of(true),
    });
    component.openConfirmDialog();

    expect(eventSpy).toHaveBeenCalledWith(mockRecipe._id);
  });
});
