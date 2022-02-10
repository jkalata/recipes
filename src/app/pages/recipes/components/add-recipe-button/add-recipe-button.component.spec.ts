import { RecipesService } from './../../services/recipes.service';
import { RecipeEventService } from './../../services/recipe-event.service';
import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
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

  const mockRecipesService = jasmine.createSpyObj<RecipesService>({
    create: of({}),
    delete: of({}),
    get: of(MOCK_RECIPE_LIST[0]),
    getList: of(MOCK_RECIPE_LIST),
    update: of({}),
  });

  const createComponent = createComponentFactory({
    component: AddRecipeButtonComponent,
    providers: [
      mockProvider(MatDialog),
      RecipeEventService,
      { provide: RecipesService, useValue: mockRecipesService },
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
