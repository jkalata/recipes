import { MOCK_RECIPE_LIST } from './../mocks/recipes.mocks';
import {
  IRecipe,
  IRecipeService,
  INewRecipe,
} from './../interfaces/recipes.interfaces';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockRecipesService implements IRecipeService {
  private recipeList: IRecipe[] = MOCK_RECIPE_LIST;

  constructor() {}

  getList(): Observable<IRecipe[]> {
    return of(this.recipeList);
  }

  create(body: INewRecipe): Observable<{}> {
    const _id: string = this.getNextId();
    this.recipeList.push({ ...body, _id });
    return of({});
  }

  private getNextId(): string {
    const stringId = this.recipeList.sort((a, b) => {
      if (Number(a) < Number(b)) {
        return 1;
      }
      if (Number(a) > Number(b)) {
        return -1;
      } else return 0;
    })[0]._id;

    return (Number(stringId) + 1).toString();
  }

  delete(id: string): Observable<{}> {
    this.recipeList = this.recipeList.filter((recipe) => recipe._id === id);
    return of({});
  }

  get(id: string): Observable<IRecipe> {
    const recipe = this.recipeList.find((element) => element._id === id);
    return recipe
      ? of(recipe)
      : throwError(() => new Error('Entity not found'));
  }

  update(body: IRecipe): Observable<{}> {
    this.recipeList = this.recipeList.map((recipe) => {
      if (recipe._id === body._id) {
        return body;
      }
      return recipe;
    });
    return of({});
  }
}
