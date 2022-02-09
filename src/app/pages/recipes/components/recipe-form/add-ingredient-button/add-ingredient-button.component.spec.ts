import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientButtonComponent } from './add-ingredient-button.component';

describe('AddIngredientButtonComponent', () => {
  let component: AddIngredientButtonComponent;
  let fixture: ComponentFixture<AddIngredientButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIngredientButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngredientButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
