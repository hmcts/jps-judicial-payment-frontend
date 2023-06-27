import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SittingRecordsLandingManageRecordsComponent } from './sitting-records-landing-manage-records.component';

describe('SittingRecordsLandingManageRecordsComponent', () => {
  let component: SittingRecordsLandingManageRecordsComponent;
  let fixture: ComponentFixture<SittingRecordsLandingManageRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SittingRecordsLandingManageRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingManageRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
