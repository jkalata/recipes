import { RecipeFormCreator } from './RecipeFormCreator';
import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
import { IRecipe } from './../../interfaces/recipes.interfaces';
describe('RecipeFormCreator', () => {
  const newRecipe: IRecipe = {
    _id: '',
    description: '',
    ingredients: [
      {
        _id: '0',
        name: '',
        quantity: '',
      },
    ],
    name: '',
    preparationTimeInMinutes: 0,
  };

  const existingRecipe = MOCK_RECIPE_LIST[0];

  it('creates new recipe form', () => {
    const form = new RecipeFormCreator().init();

    expect(form.getRawValue()).toEqual(newRecipe);
  });

  it('creates existing recipe form', () => {
    const form = new RecipeFormCreator(existingRecipe).init();

    expect(form.getRawValue()).toEqual(existingRecipe);
  });
});
