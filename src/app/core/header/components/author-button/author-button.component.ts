import { MatDialog } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';

@Component({
  selector: 'app-author-button',
  templateUrl: './author-button.component.html',
  styleUrls: ['./author-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorButtonComponent {
  constructor(private dialog: MatDialog) {}

  openAuthorDialog() {
    this.dialog.open(AuthorDialogComponent);
  }
}
