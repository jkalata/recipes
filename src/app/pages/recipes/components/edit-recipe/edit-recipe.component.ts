import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { take, mergeMap, tap } from 'rxjs';
import { RecipeFormCreator } from './../recipe-form/RecipeFormCreator';
import { RecipeEventService } from './../../services/recipe-event.service';
import { RecipesService } from './../../services/recipes.service';
import { INewRecipe, IRecipe } from './../../interfaces/recipes.interfaces';
import { FormGroup, ControlsOf } from '@ngneat/reactive-forms';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRecipeComponent {
  form!: FormGroup<ControlsOf<INewRecipe>>;
  recipe!: IRecipe;
  loading: boolean = true;
  constructor(
    private recipesService: RecipesService,
    private recipeEventService: RecipeEventService,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.getRecipe();
  }

  private getRecipe(): void {
    this.activatedRoute.params
      .pipe(
        tap(() => {
          this.loading = true;
          this.changeDetector.markForCheck();
        })
      )
      .pipe(
        mergeMap((params) => this.recipesService.get(params['id'])),
        untilDestroyed(this)
      )
      .subscribe((recipe) => {
        this.form = new RecipeFormCreator(recipe).init();
        this.loading = false;
        this.recipe = recipe;
        this.changeDetector.markForCheck();
      });
  }

  updateTherapy(): void {
    this.loading = true;
    this.changeDetector.markForCheck();
    this.recipesService
      .update({ ...this.form.getRawValue(), _id: this.recipe._id })
      .pipe(take(1))
      .subscribe(() => {
        this.recipeEventService.emitRefetchEvent();
        this.loading = false;
        this.changeDetector.markForCheck();
      });
  }
}
