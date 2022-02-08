import { take } from 'rxjs';
import { IRecipe, INewRecipe } from './../../interfaces/recipes.interfaces';
import {
  IRecipeDialogData,
  RecipeDialog,
} from '../recipe-dialog/recipe-dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-edit-recipe-button',
  templateUrl: './edit-recipe-button.component.html',
  styleUrls: ['./edit-recipe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRecipeButtonComponent {
  @Input() recipe!: IRecipe;
  @Output() editEvent: EventEmitter<IRecipe> = new EventEmitter();
  constructor(private dialog: MatDialog) {}

  openEditRecipeDialog() {
    const dialogData: IRecipeDialogData = {
      okButtonLabel: 'Edit',
      title: 'Edit recipe',
      recipe: this.recipe,
    };

    this.dialog
      .open(RecipeDialog, {
        data: dialogData,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((recipe: IRecipe) => {
        if (recipe) {
          this.editEvent.emit(recipe);
        }
      });
  }
}
