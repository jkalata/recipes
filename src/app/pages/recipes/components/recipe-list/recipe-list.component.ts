import { Observable } from 'rxjs';
import { IRecipe } from './../../interfaces/recipes.interfaces';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  @Input() recipes$!: Observable<IRecipe[]>;
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();
  @Output() editEvent: EventEmitter<IRecipe> = new EventEmitter();

  identity = (index: number, item: IRecipe): string => item._id;

  emitDeleteEvent(recipeId: string): void {
    this.deleteEvent.emit(recipeId);
  }

  emitEditEvent(recipe: IRecipe): void {
    this.editEvent.emit(recipe);
  }
}
