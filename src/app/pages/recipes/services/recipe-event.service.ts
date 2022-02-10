import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEventService {
  private refetch$: Subject<void> = new Subject();

  emitRefetchEvent(): void {
    this.refetch$.next();
  }

  getRefetchObservable(): Observable<void> {
    return this.refetch$.asObservable();
  }
}
