import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerManagement } from './career-management';

describe('CareerManagement', () => {
  let component: CareerManagement;
  let fixture: ComponentFixture<CareerManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
