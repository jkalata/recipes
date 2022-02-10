import { IRecipe } from '../../interfaces/recipes.interfaces';
import { INewRecipe } from '../../interfaces/recipes.interfaces';
import { RecipeFormCreator } from '../recipe-form/RecipeFormCreator';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ControlsOf, FormGroup } from '@ngneat/reactive-forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDialogComponent {
  form: FormGroup<ControlsOf<INewRecipe>>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IRecipeDialogData,
    private dialogRef: MatDialogRef<RecipeDialogComponent>
  ) {
    this.form = new RecipeFormCreator(data.recipe).init();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}

export interface IRecipeDialogData {
  recipe?: IRecipe;
  title: string;
  okButtonLabel: string;
}
