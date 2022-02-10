import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  IConfirmDialogData,
} from './confirm-dialog.component';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let spectator: Spectator<ConfirmDialogComponent>;
  const dialogData: IConfirmDialogData = {
    message: 'Message',
  };
  const createComponent = createComponentFactory({
    component: ConfirmDialogComponent,
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: dialogData },
      mockProvider(MatDialogRef),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
