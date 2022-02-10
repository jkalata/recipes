import { RemoveIngredientButtonComponent } from './remove-ingredient-button.component';
import { Spectator, createComponentFactory, byText } from '@ngneat/spectator';

describe('RemoveIngredientButtonComponent', () => {
  let component: RemoveIngredientButtonComponent;
  let spectator: Spectator<RemoveIngredientButtonComponent>;

  const createComponent = createComponentFactory({
    component: RemoveIngredientButtonComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits event on button click', () => {
    const eventSpy = spyOn(component.remove, 'emit');

    spectator.click(byText('remove'));

    expect(eventSpy).toHaveBeenCalled();
  });
});
