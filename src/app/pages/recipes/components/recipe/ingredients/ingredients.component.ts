import {
  IIngredient,
  INewIngredient,
} from './../../../interfaces/recipes.interfaces';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsComponent {
  @Input() ingredients: INewIngredient[] = [];

  identity = (index: number, item: INewIngredient): string => item.name;
}
