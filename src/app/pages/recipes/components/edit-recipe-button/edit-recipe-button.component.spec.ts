import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
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

  it('emits recipe when dialog closes', () => {
    const eventSpy = spyOn(component['recipeEventService'], 'emitEditEvent');
    spectator.inject(MatDialog).open.andReturn({
      afterClosed: () => of(mockRecipe),
    });
    spectator.detectChanges();
    component.openEditRecipeDialog();

    expect(eventSpy).toHaveBeenCalledWith(mockRecipe);
  });
});
