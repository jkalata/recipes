import { AddRecipeDialog } from './../add-recipe-dialog/add-recipe-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IRecipe } from './../../interfaces/recipes.interfaces';
import { RecipesService } from './../../services/recipes.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-recipe-button',
  templateUrl: './add-recipe-button.component.html',
  styleUrls: ['./add-recipe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeButtonComponent {
  constructor(
    private dialog: MatDialog,
    private recipesService: RecipesService,
    private snackBar: MatSnackBar
  ) {}

  openAddRecipeDialog(): void {
    this.dialog
      .open(AddRecipeDialog)
      .afterClosed()
      .pipe(take(1))
      .subscribe((newRecipe: IRecipe) => {
        if (newRecipe) {
          this.addRecipe(newRecipe);
        }
      });
  }

  private addRecipe(newRecipe: IRecipe): void {
    this.recipesService
      .create(newRecipe)
      .pipe(take(1))
      .subscribe(
        () => {
          this.success();
        },
        (error: Error) => {
          this.error(error);
        }
      );
  }

  private success(): void {
    this.snackBar.open('Recipe added succesfuly', '', {
      duration: 2000,
    });
  }

  private error(error: Error): void {
    this.snackBar.open(`Error adding recipe; ${error.message}`, '', {
      duration: 2000,
    });
  }
}
