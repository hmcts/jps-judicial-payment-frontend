import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlagsComponent } from './manage-flags.component';

describe('ManageFlagsComponent', () => {
  let component: ManageFlagsComponent;
  let fixture: ComponentFixture<ManageFlagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFlagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
