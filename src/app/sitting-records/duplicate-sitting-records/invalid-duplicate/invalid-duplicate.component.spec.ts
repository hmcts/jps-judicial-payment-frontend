import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidDuplicateComponent } from './invalid-duplicate.component';

describe('InvalidDuplicateComponent', () => {
  let component: InvalidDuplicateComponent;
  let fixture: ComponentFixture<InvalidDuplicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidDuplicateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
