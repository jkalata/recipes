import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeButtonComponent } from './add-recipe-button.component';

describe('AddRecipeButtonComponent', () => {
  let component: AddRecipeButtonComponent;
  let fixture: ComponentFixture<AddRecipeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
