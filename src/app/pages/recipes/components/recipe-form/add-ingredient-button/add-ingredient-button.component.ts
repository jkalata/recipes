import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-add-ingredient-button',
  templateUrl: './add-ingredient-button.component.html',
  styleUrls: ['./add-ingredient-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIngredientButtonComponent {
  @Output() add: EventEmitter<void> = new EventEmitter();
}
