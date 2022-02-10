import { of } from 'rxjs';
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
    get: of(MOCK_RECIPE_LIST[0]),
    getList: of(MOCK_RECIPE_LIST),
    update: of({}),
  });
  const mockRecipe = MOCK_RECIPE_LIST[0];
  const createComponent = createComponentFactory({
    component: RecipesComponent,
    imports: [MatSnackBarModule],
    declarations: [
      MockComponents(AddRecipeButtonComponent, RecipeListComponent),
    ],
    providers: [
      { provide: RecipesService, useValue: mockRecipeService },
      RecipeEventService,
      ChangeDetectorRef,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets recipe list', () => {
    expect(component.recipes$).toEqual(
      spectator.inject(RecipesService).getList()
    );
  });

  it('renders add recipe button', () => {
    expect(spectator.query(AddRecipeButtonComponent)).toBeTruthy();
  });

  it('renders recipe list', () => {
    expect(spectator.query(RecipeListComponent)).toBeTruthy();
  });

  it('passes recipes to recipe list', () => {
    expect(spectator.query(RecipeListComponent)?.recipes$).toEqual(
      component.recipes$
    );
  });

  it('calls add request', () => {
    component.addRecipe(mockRecipe);

    expect(component['recipesService'].create).toHaveBeenCalledWith(mockRecipe);
  });

  it('calls edit request', () => {
    component.editRecipe(mockRecipe);

    expect(component['recipesService'].update).toHaveBeenCalledWith(mockRecipe);
  });

  it('calls delete request', () => {
    component.deleteRecipe(mockRecipe._id);

    expect(component['recipesService'].delete).toHaveBeenCalledWith(
      mockRecipe._id
    );
  });
});
