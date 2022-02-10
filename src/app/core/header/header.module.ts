import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
