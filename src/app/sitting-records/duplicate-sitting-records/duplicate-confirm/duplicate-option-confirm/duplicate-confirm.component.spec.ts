import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateConfirmComponent } from './duplicate-confirm.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SittingRecordsInfoBannerComponent } from '../../../sitting-records-info-banner/sitting-records-info-banner.component';

describe('DuplicateConfirmComponent', () => {
  let component: DuplicateConfirmComponent;
  let fixture: ComponentFixture<DuplicateConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateConfirmComponent, SittingRecordsInfoBannerComponent ],
      imports: [ HttpClientTestingModule ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateConfirmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
