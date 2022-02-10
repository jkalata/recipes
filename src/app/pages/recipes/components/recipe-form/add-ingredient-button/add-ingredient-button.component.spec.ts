import { AddIngredientButtonComponent } from './add-ingredient-button.component';
import {
  Spectator,
  createComponentFactory,
  byRole,
  byText,
} from '@ngneat/spectator';

describe('AddIngredientButtonComponent', () => {
  let component: AddIngredientButtonComponent;
  let spectator: Spectator<AddIngredientButtonComponent>;

  const createComponent = createComponentFactory({
    component: AddIngredientButtonComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits event on button click', () => {
    const eventSpy = spyOn(component.add, 'emit');

    spectator.click(byText('add'));

    expect(eventSpy).toHaveBeenCalled();
  });
});
