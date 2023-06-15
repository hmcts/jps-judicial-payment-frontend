import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateSittingRecordsComponent } from './duplicate-sitting-records.component';

describe('DuplicateSittingRecordsComponent', () => {
  let component: DuplicateSittingRecordsComponent;
  let fixture: ComponentFixture<DuplicateSittingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateSittingRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateSittingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
