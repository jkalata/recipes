import { SearchComponent } from './search.component';
import {
  Spectator,
  createComponentFactory,
  byRole,
  byTestId,
} from '@ngneat/spectator';
import { SearchEventService } from '../../services/search-event.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let spectator: Spectator<SearchComponent>;

  const createComponent = createComponentFactory({
    component: SearchComponent,
    providers: [SearchEventService],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits search value on input event', () => {
    const emitSpy = spyOn(component['searchEventService'], 'emitSearchEvent');

    spectator.dispatchFakeEvent(byTestId('input'), 'input');

    expect(emitSpy).toHaveBeenCalledWith(component.searchValue);
  });
});
