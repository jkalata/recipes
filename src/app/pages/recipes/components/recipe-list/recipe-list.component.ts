import { Observable } from 'rxjs';
import { IRecipe } from './../../interfaces/recipes.interfaces';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  @Input() recipes$!: Observable<IRecipe[]>;

  identity = (index: number, item: IRecipe): string => item._id;
}
