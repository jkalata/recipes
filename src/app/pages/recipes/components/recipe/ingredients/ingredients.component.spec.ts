import { MOCK_RECIPE_LIST } from './../../../mocks/recipes.mocks';
import { IngredientsComponent } from './ingredients.component';
import { Spectator, createComponentFactory, byTestId } from '@ngneat/spectator';

describe('IngredientsComponent', () => {
  let component: IngredientsComponent;
  let spectator: Spectator<IngredientsComponent>;

  const mockRecipe = MOCK_RECIPE_LIST[0];
  const createComponent = createComponentFactory({
    component: IngredientsComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        ingredients: mockRecipe.ingredients,
      },
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders all ingredients', () => {
    expect(spectator.queryAll(byTestId('ingredient'))).toHaveLength(
      component.ingredients.length
    );
  });
});
