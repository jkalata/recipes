import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import {
  IRecipe,
  IRecipeService,
  INewRecipe,
} from './../interfaces/recipes.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipesService implements IRecipeService {
  private url: string = `${environment.apiURL}/recipe`;

  constructor(private http: HttpClient) {}

  getList(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.url);
  }

  create(body: INewRecipe): Observable<{}> {
    return this.http.post(this.url, body);
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.url}/${id}`);
  }

  get(id: string): Observable<IRecipe> {
    return this.http.get<IRecipe>(`${this.url}/${id}`);
  }

  update(body: IRecipe): Observable<{}> {
    return this.http.put(`${this.url}/${body._id}`, body);
  }
}
