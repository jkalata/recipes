import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('SnackbarService', () => {
  let spectator: SpectatorService<SnackbarService>;
  let service: SnackbarService;

  const createService = createServiceFactory({
    service: SnackbarService,
    imports: [MatSnackBarModule],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shows snackbar', () => {
    const showSpy = spyOn(service['snackBar'], 'open');
    const message = 'Message';

    service.show(message);

    expect(showSpy).toHaveBeenCalledWith(message, 'OK', { duration: 3000 });
  });
});
