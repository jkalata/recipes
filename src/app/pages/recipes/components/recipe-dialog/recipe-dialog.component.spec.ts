import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
import { RecipeFormCreator } from './../recipe-form/RecipeFormCreator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  RecipeDialogComponent,
  IRecipeDialogData,
} from './recipe-dialog.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
  byText,
} from '@ngneat/spectator';

describe('RecipeDialogComponent', () => {
  let component: RecipeDialogComponent;
  let spectator: Spectator<RecipeDialogComponent>;

  describe('AddRecipe variant', () => {
    const dialogData: IRecipeDialogData = {
      okButtonLabel: 'OK',
      title: 'Title',
    };

    const mockForm = new RecipeFormCreator(MOCK_RECIPE_LIST[0]).init();

    const createComponent = createComponentFactory({
      component: RecipeDialogComponent,
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        mockProvider(MatDialogRef),
      ],
    });

    beforeEach(() => {
      spectator = createComponent({
        props: {
          form: mockForm,
        },
      });
      component = spectator.component;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('cancels adding recipe', () => {
      spectator.click(byText('Cancel'));

      expect(spectator.component['dialogRef'].close).toHaveBeenCalledWith();
    });

    it('emits new recipe', () => {
      spectator.component.add();

      spectator.detectComponentChanges();

      expect(spectator.component['dialogRef'].close).toHaveBeenCalledWith(
        component.form.getRawValue()
      );
    });
  });

  describe('EditRecipe variant', () => {
    const dialogData: IRecipeDialogData = {
      okButtonLabel: 'OK',
      title: 'Title',
      recipe: MOCK_RECIPE_LIST[0],
    };

    const createComponent = createComponentFactory({
      component: RecipeDialogComponent,
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        mockProvider(MatDialogRef),
      ],
    });

    beforeEach(() => {
      spectator = createComponent();
      component = spectator.component;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('cancels editing recipe', () => {
      spectator.click(byText('Cancel'));

      expect(spectator.component['dialogRef'].close).toHaveBeenCalledWith();
    });

    it('emits edited recipe', () => {
      spectator.component.add();

      expect(spectator.component['dialogRef'].close).toHaveBeenCalledWith(
        component.form.getRawValue()
      );
    });
  });
});
