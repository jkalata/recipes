import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialog>
  ) {}

  no(): void {
    this.dialogRef.close();
  }

  yes(): void {
    this.dialogRef.close(true);
  }
}

interface IConfirmDialogData {
  message: string;
}
