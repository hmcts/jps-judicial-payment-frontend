import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSittingRecordsLandingComponent } from './compare-sitting-records-landing.component';
import { TribunalServiceComponent } from '../../shared-components/tribunal-service/tribunal-service.component';
import { SittingDateComponent } from '../../shared-components/sitting-date/sitting-date.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegionComponent } from '../../shared-components/region/region.component';

describe('CompareSittingRecordsLandingComponent', () => {
  let component: CompareSittingRecordsLandingComponent;
  let fixture: ComponentFixture<CompareSittingRecordsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ CompareSittingRecordsLandingComponent, TribunalServiceComponent, SittingDateComponent, RegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareSittingRecordsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable the region field when the tribunalService field is not empty', () => {
    const tribunalService = component.compareRecordForm.controls['tribunalService'];
    const region = component.compareRecordForm.controls['region'];

    tribunalService.setValue('test');
    expect(region.enabled).toBeTrue();
  });

  it('should reset the region field when the tribunalService field is changed', () => {
    const tribunalService = component.compareRecordForm.controls['tribunalService'];
    const region = component.compareRecordForm.controls['region'];

    tribunalService.setValue('test');
    region.setValue('test venue');

    tribunalService.setValue('new test');
    expect(region.value).toBeNull();
  });

  

});
