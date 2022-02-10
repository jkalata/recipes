import { MatDialogRef } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDialogComponent {
  constructor(public dialogRef: MatDialogRef<AuthorDialogComponent>) {}
}
