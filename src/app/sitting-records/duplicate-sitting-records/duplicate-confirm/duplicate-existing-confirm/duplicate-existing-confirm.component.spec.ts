import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SittingRecordsInfoBannerComponent } from '../../../sitting-records-info-banner/sitting-records-info-banner.component'
import { DuplicateExistingConfirmComponent } from './duplicate-existing-confirm.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConvertAddPeriodPipe, ConvertToStringPeriodPipe } from '../../../../_pipes/convert-period-pipe'

describe('DuplicateExistingConfirmComponent', () => {
  let component: DuplicateExistingConfirmComponent;
  let fixture: ComponentFixture<DuplicateExistingConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DuplicateExistingConfirmComponent, SittingRecordsInfoBannerComponent, ConvertAddPeriodPipe, ConvertToStringPeriodPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateExistingConfirmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
