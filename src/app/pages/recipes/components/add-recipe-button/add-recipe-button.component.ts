import { RecipeEventService } from './../../services/recipe-event.service';
import { RecipesService } from './../../services/recipes.service';
import { IRecipeDialogData } from '../recipe-dialog/recipe-dialog.component';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';
import { INewRecipe, IRecipe } from './../../interfaces/recipes.interfaces';
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
    private recipeEventService: RecipeEventService
  ) {}

  openAddRecipeDialog(): void {
    const dialogData: IRecipeDialogData = {
      okButtonLabel: 'Add',
      title: 'Add recipe',
    };
    this.dialog
      .open(RecipeDialogComponent, {
        data: dialogData,
        width: '90%',
        maxWidth: '500px',
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((newRecipe: IRecipe) => {
        if (newRecipe) {
          this.addRecipe(newRecipe);
        }
      });
  }

  private addRecipe(newRecipe: INewRecipe): void {
    this.recipesService
      .create(newRecipe)
      .pipe(take(1))
      .subscribe(() => {
        this.recipeEventService.emitRefetchEvent();
      });
  }
}
