import { IRecipe } from './../../interfaces/recipes.interfaces';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  @Input() recipes!: IRecipe[];

  constructor() {}

  identity = (index: number, item: IRecipe): string => item._id;

  ngOnInit(): void {}
}
