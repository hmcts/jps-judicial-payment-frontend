import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateConfirmSuccessComponent } from './duplicate-confirm-success.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SittingRecordsInfoBannerComponent } from '../../../sitting-records-info-banner/sitting-records-info-banner.component';


describe('DuplicateConfirmSuccessComponent', () => {
  let component: DuplicateConfirmSuccessComponent;
  let fixture: ComponentFixture<DuplicateConfirmSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateConfirmSuccessComponent, SittingRecordsInfoBannerComponent ],
      imports: [HttpClientTestingModule],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateConfirmSuccessComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
