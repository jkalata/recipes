import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchEventService {
  private search$: Subject<string> = new Subject();
  emitSearchEvent(value: string): void {
    this.search$.next(value.toLowerCase());
  }

  getSearchObservable(): Observable<string> {
    return this.search$.asObservable();
  }
}
