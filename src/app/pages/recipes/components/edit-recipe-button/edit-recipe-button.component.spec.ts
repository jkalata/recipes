import { RecipeEventService } from './../../services/recipe-event.service';
import { MatDialogModule } from '@angular/material/dialog';
import { EditRecipeButtonComponent } from './edit-recipe-button.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('EditRecipeButtonComponent', () => {
  let component: EditRecipeButtonComponent;
  let spectator: Spectator<EditRecipeButtonComponent>;

  const createComponent = createComponentFactory({
    component: EditRecipeButtonComponent,
    imports: [MatDialogModule],
    providers: [RecipeEventService],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
