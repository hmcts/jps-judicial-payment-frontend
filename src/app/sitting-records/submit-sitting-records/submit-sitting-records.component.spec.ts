import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSittingRecordsComponent } from './submit-sitting-records.component';

describe('SubmitSittingRecordsComponent', () => {
  let component: SubmitSittingRecordsComponent;
  let fixture: ComponentFixture<SubmitSittingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitSittingRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitSittingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
