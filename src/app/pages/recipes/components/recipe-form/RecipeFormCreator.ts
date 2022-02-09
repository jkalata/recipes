import {
  IRecipe,
  INewRecipe,
  INewIngredient,
  IIngredient,
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

  init(): FormGroup<ControlsOf<IRecipe>> {
    const ingredients: FormArray<IIngredient> = this.getIngredientsArray();
    return this.fb.group({
      _id: [this.recipe?._id ?? ''],
      description: [this.recipe?.description ?? '', Validators.required],
      ingredients: this.getIngredientsArray(),
      name: [this.recipe?.name ?? '', Validators.required],
      preparationTimeInMinutes: [
        this.recipe?.preparationTimeInMinutes ?? 0,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  private getIngredientsArray(): FormArray<IIngredient> {
    if (this.recipe) {
    }
    return this.recipe
      ? this.getExistingIngredients(this.recipe)
      : this.getNewIngredients();
  }

  private getExistingIngredients(recipe: IRecipe): FormArray<IIngredient> {
    return this.fb.array(
      recipe.ingredients.map((ingredient) =>
        this.fb.group({
          _id: [ingredient._id],
          name: [ingredient.name, Validators.required],
          quantity: [ingredient.quantity, Validators.required],
        })
      )
    );
  }

  private getNewIngredients(): FormArray<IIngredient> {
    return this.fb.array([
      this.fb.group({
        _id: [''],
        name: ['', Validators.required],
        quantity: ['', Validators.required],
      }),
    ]);
  }
}
