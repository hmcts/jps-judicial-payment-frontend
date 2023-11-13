import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRecordsComponent } from './compare-records.component';

describe('CompareRecordsComponent', () => {
  let component: CompareRecordsComponent;
  let fixture: ComponentFixture<CompareRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
