import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthorButtonComponent } from './components/author-button/author-button.component';
import { AuthorDialogComponent } from './components/author-dialog/author-dialog.component';

@NgModule({
  declarations: [HeaderComponent, AuthorButtonComponent, AuthorDialogComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
