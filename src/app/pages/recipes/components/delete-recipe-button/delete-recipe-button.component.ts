import { RecipesService } from './../../services/recipes.service';
import { IRecipe } from './../../interfaces/recipes.interfaces';
import { RecipeEventService } from './../../services/recipe-event.service';
import { take } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-recipe-button',
  templateUrl: './delete-recipe-button.component.html',
  styleUrls: ['./delete-recipe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteRecipeButtonComponent {
  @Input() recipe!: IRecipe;

  constructor(
    private dialog: MatDialog,
    private recipeEventService: RecipeEventService,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  openConfirmDialog() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          message: `Are you sure you want to delete this recipe: ${this.recipe.name}`,
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result) {
          this.deleteRecipe(this.recipe._id);
        }
      });
  }

  deleteRecipe(recipeId: string): void {
    this.recipesService
      .delete(recipeId)
      .pipe(take(1))
      .subscribe(() => {
        this.recipeEventService.emitRefetchEvent();
        this.router.navigate(['recipes']);
      });
  }
}
