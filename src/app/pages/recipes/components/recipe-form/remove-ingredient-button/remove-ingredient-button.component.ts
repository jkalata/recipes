import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-remove-ingredient-button',
  templateUrl: './remove-ingredient-button.component.html',
  styleUrls: ['./remove-ingredient-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveIngredientButtonComponent {
  @Output() remove: EventEmitter<void> = new EventEmitter();
}
