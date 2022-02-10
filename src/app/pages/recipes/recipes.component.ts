import { RecipeEventService } from './services/recipe-event.service';
import { Observable } from 'rxjs';
import { IRecipe } from './interfaces/recipes.interfaces';
import { RecipesService } from './services/recipes.service';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent {
  recipes$!: Observable<IRecipe[]>;

  constructor(
    private recipesService: RecipesService,
    private recipeEventService: RecipeEventService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.getRecipes();
    this.initRefetchSubscription();
  }

  private getRecipes(): void {
    this.recipes$ = this.recipesService.getList();
    this.changeDetector.markForCheck();
  }

  private initRefetchSubscription(): void {
    this.recipeEventService
      .getRefetchObservable()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.getRecipes());
  }

  filterRecipes(value: string): void {}
}
