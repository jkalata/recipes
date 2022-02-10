import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
