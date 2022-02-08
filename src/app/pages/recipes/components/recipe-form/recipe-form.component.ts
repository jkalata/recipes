import { INewRecipe } from './../../interfaces/recipes.interfaces';
import { FormGroup, ControlsOf } from '@ngneat/reactive-forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent implements OnInit {
  form!: FormGroup<ControlsOf<INewRecipe>>;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup<
      ControlsOf<INewRecipe>
    >;
  }
}
