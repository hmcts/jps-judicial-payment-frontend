import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SittingRecordsLandingJohadminComponent } from './sitting-records-landing-johadmin.component';

describe('SittingRecordsLandingJohadminComponent', () => {
  let component: SittingRecordsLandingJohadminComponent;
  let fixture: ComponentFixture<SittingRecordsLandingJohadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SittingRecordsLandingJohadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingJohadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
