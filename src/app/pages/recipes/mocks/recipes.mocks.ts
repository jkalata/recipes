import { IRecipe, IIngredient } from './../interfaces/recipes.interfaces';

const MOCK_INGREDIENTLIST: IIngredient[] = [
  {
    _id: '1',
    name: 'Ingredient 1',
    quantity: '100 g',
  },
  {
    _id: '2',
    name: 'Ingredient 2',
    quantity: '200 g',
  },
  {
    _id: '3',
    name: 'Ingredient 3',
    quantity: '300 g',
  },
  {
    _id: '4',
    name: 'Ingredient 4',
    quantity: '400 g',
  },
];

export const MOCK_RECIPE_LIST: IRecipe[] = [
  {
    _id: '1',
    description: 'Description id 1',
    ingredients: MOCK_INGREDIENTLIST.slice(0, 2),
    name: 'Recipe name 1',
    preparationTimeInMinutes: 59,
  },
  {
    _id: '2',
    description: 'Description id 2',
    ingredients: MOCK_INGREDIENTLIST.slice(2, 4),
    name: 'Recipe name 2',
    preparationTimeInMinutes: 61,
  },
];
