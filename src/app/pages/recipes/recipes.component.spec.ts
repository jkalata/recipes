import { IRecipe } from './interfaces/recipes.interfaces';
import { SearchEventService } from './services/search-event.service';
import { SearchComponent } from './components/search/search.component';
import { of, take } from 'rxjs';
import { MOCK_RECIPE_LIST } from './mocks/recipes.mocks';
import { RecipeEventService } from './services/recipe-event.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecipesService } from './services/recipes.service';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { AddRecipeButtonComponent } from './components/add-recipe-button/add-recipe-button.component';
import { MockComponents } from 'ng-mocks';
import { RecipesComponent } from './recipes.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ChangeDetectorRef } from '@angular/core';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let spectator: Spectator<RecipesComponent>;

  const mockRecipeService = jasmine.createSpyObj<RecipesService>({
    create: of({}),
    delete: of({}),
    get: of(MOCK_RECIPE_LIST[0] as IRecipe),
    getList: of(MOCK_RECIPE_LIST),
    update: of({}),
  });
  const createComponent = createComponentFactory({
    component: RecipesComponent,
    imports: [MatSnackBarModule],
    declarations: [
      MockComponents(
        AddRecipeButtonComponent,
        RecipeListComponent,
        SearchComponent
      ),
    ],
    providers: [
      { provide: RecipesService, useValue: mockRecipeService },
      RecipeEventService,
      ChangeDetectorRef,
      SearchEventService,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders add recipe button', () => {
    expect(spectator.query(AddRecipeButtonComponent)).toBeTruthy();
  });

  it('renders search bar', () => {
    expect(spectator.query(SearchComponent)).toBeTruthy();
  });

  it('renders recipe list', () => {
    expect(spectator.query(RecipeListComponent)).toBeTruthy();
  });

  it('passes recipes to recipe list', () => {
    expect(spectator.query(RecipeListComponent)?.recipes).toEqual(
      component.recipes
    );
  });

  it('refetches recipes on event', () => {
    spectator.component['recipeEventService']
      .getRefetchObservable()
      .pipe(take(1))
      .subscribe(() => {
        expect(
          spectator.component['recipesService'].getList
        ).toHaveBeenCalled();
      });
    spectator.inject(RecipeEventService).emitRefetchEvent();
  });
});
