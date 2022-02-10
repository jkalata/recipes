import { IRecipe } from './../../interfaces/recipes.interfaces';
export class FilterChecker {
  check(recipe: IRecipe, value: string): boolean {
    return (
      recipe.name.toLowerCase().includes(value) ||
      recipe.description.toLowerCase().includes(value) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.name.toLowerCase().includes(value)
      )
    );
  }
}
