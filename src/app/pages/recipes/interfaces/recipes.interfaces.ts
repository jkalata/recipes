import { Observable } from 'rxjs';

export interface IRecipe {
  _id: string;
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients: IIngredient[];
}

export interface IIngredient {
  _id: string;
  name: string;
  quantity: string;
}

export type INewRecipe = Omit<IRecipe, '_id'> & {
  ingredients: INewIngredient[];
};

export type INewIngredient = Omit<IIngredient, '_id'>;

export interface IRecipeService {
  getList(): Observable<IRecipe[]>;
  get(id: string): Observable<IRecipe>;
  update(body: IRecipe): Observable<{}>;
  delete(id: string): Observable<{}>;
  create(body: INewRecipe): Observable<{}>;
}
