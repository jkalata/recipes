import { Observable } from 'rxjs';
import { IRecipe } from './../../interfaces/recipes.interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RecipesService } from './../../services/recipes.service';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent {
  recipe$!: Observable<IRecipe>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        console.log(params);
        this.recipe$ = this.recipesService.get(params['id']);
        this.changeDetector.markForCheck();
      });
  }
}
