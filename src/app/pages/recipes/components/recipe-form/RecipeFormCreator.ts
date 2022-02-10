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
import {
  MAX_DESCRIPTION,
  MAX_NAME,
  MIN_DESCRIPTION,
  MIN_INGREDIENTS,
  MIN_NAME,
} from '../../consts/form.consts';

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
      description: [
        this.recipe?.description ?? '',
        [
          Validators.required,
          Validators.minLength(MIN_DESCRIPTION),
          Validators.maxLength(MAX_DESCRIPTION),
        ],
      ],
      ingredients,
      name: [
        this.recipe?.name ?? '',
        [
          Validators.required,
          Validators.minLength(MIN_NAME),
          Validators.maxLength(MAX_NAME),
        ],
      ],
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
    let formArray: FormArray<INewIngredient> = this.fb.array([]);

    for (let i = 0; i < MIN_INGREDIENTS; i++) {
      formArray.push(
        this.fb.group({
          name: ['', Validators.required],
          quantity: ['', Validators.required],
        })
      );
    }

    return formArray;
  }
}
