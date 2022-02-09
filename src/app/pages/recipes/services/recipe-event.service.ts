import { IRecipe } from './../interfaces/recipes.interfaces';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEventService {
  private editEvent: Subject<IRecipe> = new Subject();
  private deleteEvent: Subject<string> = new Subject();

  emitEditEvent(recipe: IRecipe): void {
    this.editEvent.next(recipe);
  }

  emitDeleteEvent(id: string): void {
    this.deleteEvent.next(id);
  }

  getEditObservable(): Observable<IRecipe> {
    return this.editEvent.asObservable();
  }

  getDeleteObservable(): Observable<string> {
    return this.deleteEvent.asObservable();
  }
}
