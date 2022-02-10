import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('AppComponent', () => {
  let component: AppComponent;
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
