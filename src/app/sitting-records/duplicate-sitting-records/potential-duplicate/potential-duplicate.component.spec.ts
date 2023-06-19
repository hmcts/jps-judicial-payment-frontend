import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDuplicateComponent } from './potential-duplicate.component';

describe('PotentialDuplicateComponent', () => {
  let component: PotentialDuplicateComponent;
  let fixture: ComponentFixture<PotentialDuplicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialDuplicateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
