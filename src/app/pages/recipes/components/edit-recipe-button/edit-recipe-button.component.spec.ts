import { IRecipe } from './../../interfaces/recipes.interfaces';
import { RecipesService } from './../../services/recipes.service';
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
import { MatTooltipModule } from '@angular/material/tooltip';

describe('EditRecipeButtonComponent', () => {
  let component: EditRecipeButtonComponent;
  let spectator: Spectator<EditRecipeButtonComponent>;
  const mockRecipe = MOCK_RECIPE_LIST[0] as IRecipe;

  const mockRecipesService = jasmine.createSpyObj<RecipesService>({
    create: of({}),
    delete: of({}),
    get: of(mockRecipe),
    getList: of(MOCK_RECIPE_LIST),
    update: of({}),
  });

  const createComponent = createComponentFactory({
    component: EditRecipeButtonComponent,
    imports: [MatDialogModule, MatTooltipModule],
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
