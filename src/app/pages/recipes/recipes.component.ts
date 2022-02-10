import { FilterChecker } from './FilterChecker';
import { SearchEventService } from './services/search-event.service';
import { RecipeEventService } from './services/recipe-event.service';
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
  recipes: IRecipe[] = [];
  filteredRecipes: IRecipe[] = [];
  filterChecker = new FilterChecker();
  loading: boolean = true;

  constructor(
    private recipesService: RecipesService,
    private recipeEventService: RecipeEventService,
    private changeDetector: ChangeDetectorRef,
    private searchEventService: SearchEventService
  ) {
    this.getRecipes();
    this.initRefetchSubscription();
    this.initSearchEventHandler();
  }

  private getRecipes(): void {
    this.recipesService
      .getList()
      .pipe(untilDestroyed(this))
      .subscribe((recipes) => {
        this.recipes = recipes;
        this.filteredRecipes = this.recipes;
        this.loading = false;
        this.changeDetector.markForCheck();
      });
  }

  private initRefetchSubscription(): void {
    this.recipeEventService
      .getRefetchObservable()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loading = true;
        this.changeDetector.markForCheck();
        this.getRecipes();
      });
  }

  private initSearchEventHandler(): void {
    this.searchEventService
      .getSearchObservable()
      .pipe(untilDestroyed(this))
      .subscribe((value: string) => {
        this.filteredRecipes = this.filter(value);
        console.log(this.filteredRecipes);
        this.changeDetector.markForCheck();
      });
  }

  private filter(value: string): IRecipe[] {
    console.log(this.recipes, value);
    return this.recipes.filter((recipe) =>
      this.filterChecker.check(recipe, value)
    );
  }
}
