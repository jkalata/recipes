import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { SearchEventService } from './../../services/search-event.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { debounceTime } from 'rxjs';
import { FormControl } from '@ngneat/reactive-forms';
@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  formControl = new FormControl<string>('');
  constructor(private searchEventService: SearchEventService) {
    this.formControl.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500))
      .subscribe(() => {
        this.emitSearchEvent();
      });
  }

  emitSearchEvent() {
    this.searchEventService.emitSearchEvent(this.formControl.getRawValue());
  }
}
