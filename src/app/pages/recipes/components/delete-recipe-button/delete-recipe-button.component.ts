import { take } from 'rxjs';
import { ConfirmDialog } from './../../../../shared/confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-delete-recipe-button',
  templateUrl: './delete-recipe-button.component.html',
  styleUrls: ['./delete-recipe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteRecipeButtonComponent {
  @Output() delete = new EventEmitter<void>();
  constructor(private dialog: MatDialog) {}

  openConfirmDialog() {
    this.dialog
      .open(ConfirmDialog, {
        data: {
          message: 'Are you sure you want to delete this recipe?',
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.delete.emit();
        }
      });
  }
}
