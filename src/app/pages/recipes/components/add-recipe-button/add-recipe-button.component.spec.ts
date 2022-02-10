import { AddRecipeButtonComponent } from './add-recipe-button.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('AddRecipeButtonComponent', () => {
  let component: AddRecipeButtonComponent;
  let spectator: Spectator<AddRecipeButtonComponent>;

  const createComponent = createComponentFactory({
    component: AddRecipeButtonComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
