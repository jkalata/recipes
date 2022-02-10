import { IIngredient, INewRecipe } from './../../interfaces/recipes.interfaces';
import { FormGroup, ControlsOf, FormBuilder } from '@ngneat/reactive-forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent implements OnInit {
  form!: FormGroup<ControlsOf<INewRecipe>>;

  constructor(
    private controlContainer: ControlContainer,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup<
      ControlsOf<INewRecipe>
    >;
  }

  addIngredient(): void {
    this.form.get('ingredients').push(this.createNewIngredientFormGroup());
  }

  private createNewIngredientFormGroup(): FormGroup<ControlsOf<IIngredient>> {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  removeIngredient(index: number): void {
    this.form.get('ingredients').removeAt(index);
  }
}
