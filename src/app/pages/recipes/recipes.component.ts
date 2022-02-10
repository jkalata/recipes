import { SnackbarService } from './../../services/snackbar.service';
import { RecipeEventService } from './services/recipe-event.service';
import { catchError, EMPTY, Observable, take } from 'rxjs';
import { IRecipe, INewRecipe } from './interfaces/recipes.interfaces';
import { RecipesService } from './services/recipes.service';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent {
  recipes$!: Observable<IRecipe[]>;

  constructor(
    private recipesService: RecipesService,
    private recipeEventService: RecipeEventService,
    private snackbarService: SnackbarService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.getRecipes();
    this.initEditEventHandler();
    this.initDeleteEventHandler();
  }

  private getRecipes(): void {
    this.recipes$ = this.recipesService.getList();
    this.changeDetector.markForCheck();
  }

  private initEditEventHandler(): void {
    this.recipeEventService
      .getEditObservable()
      .pipe(untilDestroyed(this))
      .subscribe((recipe) => {
        this.editRecipe(recipe);
      });
  }

  private initDeleteEventHandler(): void {
    this.recipeEventService
      .getDeleteObservable()
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.deleteRecipe(id);
      });
  }

  addRecipe(newRecipe: INewRecipe): void {
    this.recipesService
      .create(newRecipe)
      .pipe(
        take(1),
        catchError((error: Error) => {
          this.snackbarService.show(error.message);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getRecipes();
        this.snackbarService.show('Success');
      });
  }

  deleteRecipe(recipeId: string): void {
    this.recipesService
      .delete(recipeId)
      .pipe(
        take(1),
        catchError((error: Error) => {
          this.snackbarService.show(error.message);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getRecipes();
        this.snackbarService.show('Success');
      });
  }

  editRecipe(recipe: IRecipe): void {
    this.recipesService
      .update(recipe)
      .pipe(
        take(1),
        catchError((error: Error) => {
          this.snackbarService.show(error.message);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getRecipes();
        this.snackbarService.show('Success');
      });
  }
}
