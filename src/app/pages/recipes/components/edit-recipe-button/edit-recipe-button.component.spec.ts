import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeButtonComponent } from './edit-recipe-button.component';

describe('EditRecipeButtonComponent', () => {
  let component: EditRecipeButtonComponent;
  let fixture: ComponentFixture<EditRecipeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecipeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
