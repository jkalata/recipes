import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MOCK_RECIPE_LIST } from './../../mocks/recipes.mocks';
import { of } from 'rxjs';
import { RecipeComponent } from './../recipe/recipe.component';
import { RecipeListComponent } from './recipe-list.component';
import { Spectator, createComponentFactory, byText } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let spectator: Spectator<RecipeListComponent>;

  const createComponent = createComponentFactory({
    component: RecipeListComponent,
    imports: [CdkAccordionModule],
    declarations: [MockComponent(RecipeComponent)],
  });

  describe('no recipes', () => {
    beforeEach(() => {
      spectator = createComponent({
        props: {
          recipes$: of([]),
        },
      });
      component = spectator.component;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('renders no recipe text', () => {
      expect(spectator.query(byText('No recipes'))).toBeTruthy();
      expect(spectator.query(RecipeComponent)).not.toBeTruthy();
    });
  });

  describe('existing recipes', () => {
    beforeEach(() => {
      spectator = createComponent({
        props: {
          recipes$: of(MOCK_RECIPE_LIST),
        },
      });
      component = spectator.component;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('renders recipe component x times', () => {
      expect(spectator.queryAll(RecipeComponent).length).toBe(
        MOCK_RECIPE_LIST.length
      );
    });

    it('passes input to recipe component', () => {
      expect(spectator.queryAll(RecipeComponent)[0].recipe).toEqual(
        MOCK_RECIPE_LIST[0]
      );
    });
  });
});
