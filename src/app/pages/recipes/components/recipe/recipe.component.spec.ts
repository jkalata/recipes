import { CdkAccordionModule } from '@angular/cdk/accordion';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { EditRecipeButtonComponent } from './../edit-recipe-button/edit-recipe-button.component';
import { DeleteRecipeButtonComponent } from './../delete-recipe-button/delete-recipe-button.component';
import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
import { RecipeComponent } from './recipe.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let spectator: Spectator<RecipeComponent>;

  const mockRecipe = MOCK_RECIPE_LIST[0];
  const createComponent = createComponentFactory({
    component: RecipeComponent,
    imports: [CdkAccordionModule],
    declarations: [
      MockComponents(
        DeleteRecipeButtonComponent,
        EditRecipeButtonComponent,
        IngredientsComponent
      ),
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

  describe('delete button tests', () => {
    it('renders delete button', () => {
      expect(spectator.query(DeleteRecipeButtonComponent)).toBeTruthy();
    });

    it('passes input to delete button', () => {
      expect(spectator.query(DeleteRecipeButtonComponent)?.recipe).toEqual(
        component.recipe
      );
    });
  });

  describe('edit button tests', () => {
    it('renders edit button', () => {
      expect(spectator.query(EditRecipeButtonComponent)).toBeTruthy();
    });

    it('passes input to edit button', () => {
      expect(spectator.query(EditRecipeButtonComponent)?.recipe).toEqual(
        component.recipe
      );
    });
  });

  describe('ingredients tets', () => {
    it('renders ingredients', () => {
      expect(spectator.query(IngredientsComponent)).toBeTruthy();
    });

    it('passes input ingredients', () => {
      expect(spectator.query(IngredientsComponent)?.ingredients).toEqual(
        component.recipe.ingredients
      );
    });
  });

  describe('get preparation time tests', () => {
    it('gets time in minutes when less than 60', () => {
      component.recipe.preparationTimeInMinutes = 59;
      expect(component.preparationTime).toBe('59 minutes');
    });

    it('gets time in hours when greater than 60', () => {
      component.recipe.preparationTimeInMinutes = 90;
      expect(component.preparationTime).toBe('1.5 hours');
    });
  });
});
