import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidSittingRecordsComponent } from './valid-sitting-records.component';

describe('ValidSittingRecordsComponent', () => {
  let component: ValidSittingRecordsComponent;
  let fixture: ComponentFixture<ValidSittingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidSittingRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidSittingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
