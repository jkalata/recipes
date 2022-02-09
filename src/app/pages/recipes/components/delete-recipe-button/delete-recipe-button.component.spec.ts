import { RecipeEventService } from './../../services/recipe-event.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteRecipeButtonComponent } from './delete-recipe-button.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('DeleteRecipeButtonComponent', () => {
  let component: DeleteRecipeButtonComponent;
  let spectator: Spectator<DeleteRecipeButtonComponent>;

  const createComponent = createComponentFactory({
    component: DeleteRecipeButtonComponent,
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
