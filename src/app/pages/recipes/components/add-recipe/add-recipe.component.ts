import { RecipeEventService } from './../../services/recipe-event.service';
import { take } from 'rxjs';
import { RecipeFormCreator } from './../recipe-form/RecipeFormCreator';
import { RecipesService } from './../../services/recipes.service';
import { ControlsOf, FormGroup } from '@ngneat/reactive-forms';
import { INewRecipe } from './../../interfaces/recipes.interfaces';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeComponent {
  form: FormGroup<ControlsOf<INewRecipe>>;
  loading: boolean = false;
  constructor(
    private recipesService: RecipesService,
    private recipeEventService: RecipeEventService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.form = new RecipeFormCreator().init();
  }

  addTherapy(): void {
    this.loading = true;
    this.changeDetector.markForCheck();
    this.recipesService
      .create(this.form.getRawValue())
      .pipe(take(1))
      .subscribe(() => {
        this.recipeEventService.emitRefetchEvent();
        this.loading = false;
        this.changeDetector.markForCheck();
      });
  }
}
