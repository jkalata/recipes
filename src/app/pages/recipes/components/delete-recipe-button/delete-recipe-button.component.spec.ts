import { RouterTestingModule } from '@angular/router/testing';
import { IRecipe } from './../../interfaces/recipes.interfaces';
import { RecipesService } from './../../services/recipes.service';
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
import { MatTooltipModule } from '@angular/material/tooltip';

describe('DeleteRecipeButtonComponent', () => {
  let component: DeleteRecipeButtonComponent;
  let spectator: Spectator<DeleteRecipeButtonComponent>;

  const mockRecipe = MOCK_RECIPE_LIST[0] as IRecipe;
  const mockRecipesService = jasmine.createSpyObj<RecipesService>({
    create: of({}),
    delete: of({}),
    get: of(mockRecipe),
    getList: of(MOCK_RECIPE_LIST),
    update: of({}),
  });

  const createComponent = createComponentFactory({
    component: DeleteRecipeButtonComponent,
    imports: [MatDialogModule, MatTooltipModule, RouterTestingModule],
    providers: [
      RecipeEventService,
      mockProvider(MatDialog),
      { provide: RecipesService, useValue: mockRecipesService },
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
