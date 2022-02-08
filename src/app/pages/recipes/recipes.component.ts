import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable, take } from 'rxjs';
import { IRecipe, INewRecipe } from './interfaces/recipes.interfaces';
import { RecipesService } from './services/recipes.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

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
    private snackBar: MatSnackBar
  ) {
    this.getRecipes();
  }

  private getRecipes(): void {
    this.recipes$ = this.recipesService.getList();
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
