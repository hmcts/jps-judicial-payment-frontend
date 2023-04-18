import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSittingRecordComponent } from './add-sitting-record.component';

describe('AddSittingRecordComponent', () => {
  let component: AddSittingRecordComponent;
  let fixture: ComponentFixture<AddSittingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSittingRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSittingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
