import { IRecipe } from './../../interfaces/recipes.interfaces';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent implements OnInit {
  @Input() recipe!: IRecipe;

  constructor() {}

  get preparationTime(): string {
    return this.recipe.preparationTimeInMinutes < 60
      ? `${this.recipe.preparationTimeInMinutes} minutes`
      : this.getPreparationTimeInHours();
  }

  private getPreparationTimeInHours(): string {
    return `${(this.recipe.preparationTimeInMinutes / 60).toPrecision(
      2
    )} hours`;
  }

  ngOnInit(): void {}
}
