import { Observable } from 'rxjs';
import { IRecipe } from './interfaces/recipes.interfaces';
import { RecipesService } from './services/recipes.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent {
  recipes$: Observable<IRecipe[]>;

  constructor(private recipesService: RecipesService) {
    this.recipes$ = this.recipesService.getList();
  }
}
