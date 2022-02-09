import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveIngredientButtonComponent } from './remove-ingredient-button.component';

describe('RemoveIngredientButtonComponent', () => {
  let component: RemoveIngredientButtonComponent;
  let fixture: ComponentFixture<RemoveIngredientButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveIngredientButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveIngredientButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
