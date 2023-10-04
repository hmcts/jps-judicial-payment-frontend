import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollIdComponent } from './payroll-id.component';

describe('PayrollIdComponent', () => {
  let component: PayrollIdComponent;
  let fixture: ComponentFixture<PayrollIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
