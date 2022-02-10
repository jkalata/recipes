import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddRecipeButtonComponent } from './add-recipe-button.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator';
import { of } from 'rxjs';

describe('AddRecipeButtonComponent', () => {
  let component: AddRecipeButtonComponent;
  let spectator: Spectator<AddRecipeButtonComponent>;

  const createComponent = createComponentFactory({
    component: AddRecipeButtonComponent,
    providers: [mockProvider(MatDialog)],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits new recipe on dialog close', () => {
    const mockRecipe = MOCK_RECIPE_LIST[0];
    const eventSpy = spyOn(component.addEvent, 'emit');
    spectator.inject(MatDialog).open.andReturn({
      afterClosed: () => of(mockRecipe),
    });

    component.openAddRecipeDialog();

    expect(eventSpy).toHaveBeenCalledWith(mockRecipe);
  });
});
