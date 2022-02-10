import { IRecipe } from './../../interfaces/recipes.interfaces';
import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
import { RecipeFormCreator } from './../recipe-form/RecipeFormCreator';
import { RecipeEventService } from './../../services/recipe-event.service';
import { RecipesService } from './../../services/recipes.service';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
  byText,
} from '@ngneat/spectator';
import { AddRecipeComponent } from './add-recipe.component';

describe('AddRecipeComponent', () => {
  let component: AddRecipeComponent;
  let spectator: Spectator<AddRecipeComponent>;

  const createComponent = createComponentFactory({
    component: AddRecipeComponent,
    providers: [mockProvider(RecipesService), RecipeEventService],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls add request when save clicked', () => {
    component.form = new RecipeFormCreator(
      MOCK_RECIPE_LIST[0] as IRecipe
    ).init();

    spectator.detectComponentChanges();
    spectator.click(byText('Save'));
    expect(spectator.inject(RecipesService).create).toHaveBeenCalled();
  });
});
