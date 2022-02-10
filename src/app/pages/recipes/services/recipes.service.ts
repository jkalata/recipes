import { environment } from './../../../../environments/environment';
import { catchError, Observable, EMPTY, tap } from 'rxjs';
import {
  IRecipe,
  IRecipeService,
  INewRecipe,
} from './../interfaces/recipes.interfaces';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Injectable()
export class RecipesService implements IRecipeService {
  private url: string = `${this.apiUrl}/recipe`;
  private headers: HttpHeaders = new HttpHeaders().set(
    'X-API-KEY',
    environment.apiKey
  );

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    @Inject('API_URL') private apiUrl: string
  ) {
    console.log(this.url);
  }

  getList(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.url, { headers: this.headers }).pipe(
      catchError((error: Error) => {
        this.snackbarService.show(error.message);
        return EMPTY;
      }),
      tap(() => this.snackbarService.show('Success getList'))
    );
  }

  create(body: INewRecipe): Observable<{}> {
    return this.http.post(this.url, body, { headers: this.headers }).pipe(
      catchError((error: Error) => {
        this.snackbarService.show(error.message);
        return EMPTY;
      }),
      tap(() => this.snackbarService.show('Success create'))
    );
  }

  delete(id: string): Observable<{}> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.headers })
      .pipe(
        catchError((error: Error) => {
          this.snackbarService.show(error.message);
          return EMPTY;
        }),
        tap(() => this.snackbarService.show('Success delete'))
      );
  }

  get(id: string): Observable<IRecipe> {
    return this.http
      .get<IRecipe>(`${this.url}/${id}`, { headers: this.headers })
      .pipe(
        catchError((error: Error) => {
          this.snackbarService.show(error.message);
          return EMPTY;
        }),
        tap(() => this.snackbarService.show('Success get'))
      );
  }

  update(body: IRecipe): Observable<{}> {
    const recipe: INewRecipe = {
      description: body.description,
      ingredients: body.ingredients,
      name: body.name,
      preparationTimeInMinutes: body.preparationTimeInMinutes,
    };
    return this.http
      .put(`${this.url}/${body._id}`, recipe, { headers: this.headers })
      .pipe(
        catchError((error: Error) => {
          this.snackbarService.show(error.message);
          return EMPTY;
        }),
        tap(() => this.snackbarService.show('Success update'))
      );
  }
}
