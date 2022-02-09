import { IRecipeDialogData } from '../recipe-dialog/recipe-dialog.component';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';
import { INewRecipe } from './../../interfaces/recipes.interfaces';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-recipe-button',
  templateUrl: './add-recipe-button.component.html',
  styleUrls: ['./add-recipe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeButtonComponent {
  @Output() addEvent: EventEmitter<INewRecipe> = new EventEmitter();
  constructor(private dialog: MatDialog) {}

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
      .subscribe((newRecipe: INewRecipe) => {
        if (newRecipe) {
          this.addEvent.emit(newRecipe);
        }
      });
  }
}
