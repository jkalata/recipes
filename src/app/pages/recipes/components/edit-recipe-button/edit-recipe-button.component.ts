import { RecipesService } from './../../services/recipes.service';
import { RecipeEventService } from './../../services/recipe-event.service';
import { take } from 'rxjs';
import { IRecipe, INewRecipe } from './../../interfaces/recipes.interfaces';
import {
  IRecipeDialogData,
  RecipeDialogComponent,
} from '../recipe-dialog/recipe-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-edit-recipe-button',
  templateUrl: './edit-recipe-button.component.html',
  styleUrls: ['./edit-recipe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRecipeButtonComponent {
  @Input() recipe!: IRecipe;

  constructor(
    private dialog: MatDialog,
    private recipeEventService: RecipeEventService,
    private recipesService: RecipesService
  ) {}

  openEditRecipeDialog() {
    const dialogData: IRecipeDialogData = {
      okButtonLabel: 'Edit',
      title: 'Edit recipe',
      recipe: this.recipe,
    };

    this.dialog
      .open(RecipeDialogComponent, {
        data: dialogData,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((recipe: INewRecipe) => {
        if (recipe) {
          this.editRecipe({
            ...recipe,
            _id: this.recipe._id,
          });
        }
      });
  }

  editRecipe(recipe: IRecipe): void {
    this.recipesService
      .update(recipe)
      .pipe(take(1))
      .subscribe(() => {
        this.recipeEventService.emitRefetchEvent();
      });
  }
}
