import { MatDialogRef } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockProvider } from '@ngneat/spectator';

import { AuthorDialogComponent } from './author-dialog.component';

describe('AuthorDialogComponent', () => {
  let component: AuthorDialogComponent;
  let fixture: ComponentFixture<AuthorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorDialogComponent],
      providers: [mockProvider(MatDialogRef)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
