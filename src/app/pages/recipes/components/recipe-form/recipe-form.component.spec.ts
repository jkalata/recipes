import { RemoveIngredientButtonComponent } from './remove-ingredient-button/remove-ingredient-button.component';
import { AddIngredientButtonComponent } from './add-ingredient-button/add-ingredient-button.component';
import { MockComponents } from 'ng-mocks';
import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
import { RecipeFormCreator } from './RecipeFormCreator';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { RecipeFormComponent } from './recipe-form.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('RecipeFormComponent', () => {
  let component: RecipeFormComponent;
  let spectator: Spectator<RecipeFormComponent>;

  const mockForm = new RecipeFormCreator(MOCK_RECIPE_LIST[0]).init();
  const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
  formGroupDirective.form = mockForm;
  const createComponent = createComponentFactory({
    component: RecipeFormComponent,
    providers: [{ provide: ControlContainer, useValue: formGroupDirective }],
    declarations: [
      MockComponents(
        AddIngredientButtonComponent,
        RemoveIngredientButtonComponent
      ),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders add ingredient button', () => {
    expect(spectator.query(AddIngredientButtonComponent)).toBeTruthy();
  });



  it('adds ingredient on button click', () => {
    const beforeIngredientLength = component.form
      .get('ingredients')
      .getRawValue().length;

    component.addIngredient();
    const afterIngredientLength = component.form
      .get('ingredients')
      .getRawValue().length;

    expect(afterIngredientLength).toBe(beforeIngredientLength + 1);
  });

  it('removes ingredient on button click', () => {
    const beforeIngredientLength = component.form
      .get('ingredients')
      .getRawValue().length;

    component.removeIngredient(0);
    const afterIngredientLength = component.form
      .get('ingredients')
      .getRawValue().length;

    expect(afterIngredientLength).toBe(beforeIngredientLength - 1);
  });
});
