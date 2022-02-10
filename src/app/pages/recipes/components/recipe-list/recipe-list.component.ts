import { FilterChecker } from './FilterChecker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SearchEventService } from './../../services/search-event.service';
import { map, Observable, take } from 'rxjs';
import { IRecipe } from './../../interfaces/recipes.interfaces';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
@UntilDestroy()
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  @Input() recipes$!: Observable<IRecipe[]>;

  private filterChecker = new FilterChecker();
  filteredRecipes$: Observable<IRecipe[]> = new Observable();
  constructor(
    private searchEventService: SearchEventService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.initSearchEventHandler();
  }

  ngOnInit(): void {
    this.recipes$.pipe(untilDestroyed(this)).subscribe(() => {
      this.filteredRecipes$ = this.recipes$;
    });
  }

  identity = (_index: number, item: IRecipe): string => item._id;

  private initSearchEventHandler(): void {
    this.searchEventService
      .getSearchObservable()
      .pipe(untilDestroyed(this))
      .subscribe((value: string) => {
        this.filteredRecipes$ = this.filterObservable(value);
        this.changeDetectorRef.markForCheck();
      });
  }

  private filterObservable(value: string): Observable<IRecipe[]> {
    return this.recipes$.pipe(
      take(1),
      map((recipes) => {
        return recipes.filter((recipe) =>
          this.filterChecker.check(recipe, value)
        );
      })
    );
  }
}
