import { catchError, Observable, EMPTY, tap } from 'rxjs';
import { environment } from './../../../../environments/environment';
import {
  IRecipe,
  IRecipeService,
  INewRecipe,
} from './../interfaces/recipes.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Injectable()
export class RecipesService implements IRecipeService {
  private url: string = `${environment.apiURL}/recipe`;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  getList(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.url);
  }

  create(body: INewRecipe): Observable<{}> {
    return this.http.post(this.url, body).pipe(
      catchError((error: Error) => {
        this.snackbarService.show(error.message);
        return EMPTY;
      }),
      tap(() => this.snackbarService.show('Success'))
    );
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.url}/${id}`);
  }

  get(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${this.url}/${id}`);
  }

  update(body: IRecipe): Observable<{}> {
    const recipe: INewRecipe = {
      description: body.description,
      ingredients: body.ingredients,
      name: body.name,
      preparationTimeInMinutes: body.preparationTimeInMinutes,
    };
    return this.http.put(`${this.url}/${body._id}`, recipe);
  }
}
