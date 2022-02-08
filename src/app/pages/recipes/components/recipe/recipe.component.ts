import { IRecipe } from './../../interfaces/recipes.interfaces';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent {
  @Input() recipe!: IRecipe;
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();
  @Output() editEvent: EventEmitter<IRecipe> = new EventEmitter();

  get preparationTime(): string {
    return this.recipe.preparationTimeInMinutes < 60
      ? `${this.recipe.preparationTimeInMinutes} minutes`
      : this.getPreparationTimeInHours();
  }

  private getPreparationTimeInHours(): string {
    return `${(this.recipe.preparationTimeInMinutes / 60).toPrecision(
      2
    )} hours`;
  }

  emitDeleteEvent(): void {
    this.deleteEvent.emit(this.recipe._id);
  }

  emitEditEvent(recipe: IRecipe): void {
    this.editEvent.emit(recipe);
  }
}
