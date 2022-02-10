import {
  IRecipe,
  INewRecipe,
  INewIngredient,
} from './../../interfaces/recipes.interfaces';
import {
  ControlsOf,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';

export class RecipeFormCreator {
  private fb = new FormBuilder();
  private recipe?: IRecipe;

  constructor(recipe?: IRecipe) {
    if (recipe) {
      this.recipe = recipe;
    }
  }

  init(): FormGroup<ControlsOf<INewRecipe>> {
    const ingredients: FormArray<INewIngredient> = this.getIngredientsArray();
    return this.fb.group({
      description: [this.recipe?.description ?? '', Validators.required],
      ingredients,
      name: [this.recipe?.name ?? '', Validators.required],
      preparationTimeInMinutes: [
        this.recipe?.preparationTimeInMinutes ?? 0,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  private getIngredientsArray(): FormArray<INewIngredient> {
    if (this.recipe) {
    }
    return this.recipe
      ? this.getExistingIngredients(this.recipe)
      : this.getNewIngredients();
  }

  private getExistingIngredients(recipe: IRecipe): FormArray<INewIngredient> {
    return this.fb.array(
      recipe.ingredients.map((ingredient) =>
        this.fb.group({
          name: [ingredient.name, Validators.required],
          quantity: [ingredient.quantity, Validators.required],
        })
      )
    );
  }

  private getNewIngredients(): FormArray<INewIngredient> {
    return this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        quantity: ['', Validators.required],
      }),
    ]);
  }
}
