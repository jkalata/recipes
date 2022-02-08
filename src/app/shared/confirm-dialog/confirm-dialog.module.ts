import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from './confirm-dialog';

@NgModule({
  declarations: [ConfirmDialog],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class ConfirmDialogModule {}
