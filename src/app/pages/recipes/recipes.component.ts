import { RecipeEventService } from './services/recipe-event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
    private recipeEventService: RecipeEventService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.getRecipes();
    this.initEditEventHandler();
    this.initDeleteEventHandler();
  }

  private getRecipes(): void {
    this.recipes$ = this.recipesService.getList();
  }

  private initEditEventHandler(): void {
    this.recipeEventService
      .getEditObservable()
      .pipe(untilDestroyed(this))
      .subscribe((recipe) => {
        this.editRecipe(recipe);
        this.changeDetector.markForCheck();
      });
  }

  private initDeleteEventHandler(): void {
    this.recipeEventService
      .getDeleteObservable()
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.deleteRecipe(id);
        this.changeDetector.markForCheck();
      });
  }

  addRecipe(newRecipe: INewRecipe): void {
    this.recipesService
      .create(newRecipe)
      .pipe(
        take(1),
        catchError((error: Error) => {
          this.error(error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getRecipes();
        this.success();
      });
  }

  deleteRecipe(recipeId: string): void {
    this.recipesService
      .delete(recipeId)
      .pipe(
        take(1),
        catchError((error: Error) => {
          this.error(error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getRecipes();
        this.success();
      });
  }

  editRecipe(recipe: IRecipe): void {
    this.recipesService
      .update(recipe)
      .pipe(
        take(1),
        catchError((error: Error) => {
          this.error(error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.getRecipes();
        this.success();
      });
  }

  private success(): void {
    this.snackBar.open('Success', undefined, {
      duration: 2000,
    });
  }

  private error(error: Error): void {
    this.snackBar.open(`Error: ${error.message}`, undefined, {
      duration: 2000,
    });
  }
}
