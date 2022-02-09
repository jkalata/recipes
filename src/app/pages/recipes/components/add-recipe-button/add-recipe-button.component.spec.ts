import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddRecipeButtonComponent } from './add-recipe-button.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator';

fdescribe('AddRecipeButtonComponent', () => {
  let component: AddRecipeButtonComponent;
  let spectator: Spectator<AddRecipeButtonComponent>;

  const createComponent = createComponentFactory({
    component: AddRecipeButtonComponent,
    imports: [MatDialogModule],
    providers: [
      { provide: MatDialogRef, useValue: mockProvider(MatDialogRef) },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('', () => {
    spyOn(component.dialog, 'open')
     .and
     .returnValue({afterClosed: () => of(MOCK_RECIPE_LIST[0])});
    component.openAddRecipeDialog();
    spectator.inject(MatDialogRef).close.
  });
});
