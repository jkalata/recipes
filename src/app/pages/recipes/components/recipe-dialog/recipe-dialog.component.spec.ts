import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  RecipeDialogComponent,
  IRecipeDialogData,
} from './recipe-dialog.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator';

describe('RecipeDialogComponent', () => {
  let component: RecipeDialogComponent;
  let spectator: Spectator<RecipeDialogComponent>;

  const mockDialogRef = mockProvider(MatDialogRef);

  describe('AddRecipe variant', () => {
    const dialogData: IRecipeDialogData = {
      okButtonLabel: 'OK',
      title: 'Title',
    };

    const createComponent = createComponentFactory({
      component: RecipeDialogComponent,
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    });

    beforeEach(() => {
      spectator = createComponent();
      component = spectator.component;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
