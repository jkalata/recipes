import { RecipeFormCreator } from './RecipeFormCreator';
import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
import { IRecipe, INewRecipe } from './../../interfaces/recipes.interfaces';
describe('RecipeFormCreator', () => {
  const newRecipe: INewRecipe = {
    description: '',
    ingredients: [
      {
        name: '',
        quantity: '',
      },
      {
        name: '',
        quantity: '',
      },
    ],
    name: '',
    preparationTimeInMinutes: 0,
  };

  const existingRecipe = MOCK_RECIPE_LIST[0] as IRecipe;

  it('creates new recipe form', () => {
    const form = new RecipeFormCreator().init();

    expect(form.getRawValue()).toEqual(newRecipe);
  });

  it('creates existing recipe form', () => {
    const form = new RecipeFormCreator(existingRecipe).init();
    const recipeWithoutId: INewRecipe = {
      description: existingRecipe.description,
      ingredients: existingRecipe.ingredients.map((ing) => ({
        name: ing.name,
        quantity: ing.quantity,
      })),
      name: existingRecipe.name,
      preparationTimeInMinutes: existingRecipe.preparationTimeInMinutes,
    };

    expect(form.getRawValue()).toEqual(recipeWithoutId);
  });
});
