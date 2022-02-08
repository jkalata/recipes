import { INewRecipe } from './../../interfaces/recipes.interfaces';
import { RecipeFormCreator } from './../recipe-form/RecipeFormCreator';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlsOf, FormGroup } from '@ngneat/reactive-forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe-dialog.html',
  styleUrls: ['./add-recipe-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeDialog {
  form: FormGroup<ControlsOf<INewRecipe>>;

  constructor(private dialogRef: MatDialogRef<AddRecipeDialog>) {
    this.form = new RecipeFormCreator().init();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
