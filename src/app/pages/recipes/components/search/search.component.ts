import { SearchEventService } from './../../services/search-event.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchValue: string = '';

  constructor(private searchEventService: SearchEventService) {}

  emitSearchEvent() {
    this.searchEventService.emitSearchEvent(this.searchValue);
  }
}
