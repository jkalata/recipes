import { UntilDestroy } from '@ngneat/until-destroy';
import { IRecipe } from './../../interfaces/recipes.interfaces';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
@UntilDestroy()
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  @Input() recipes: IRecipe[] = [];

  identity = (_index: number, item: IRecipe): string => item._id;
}
