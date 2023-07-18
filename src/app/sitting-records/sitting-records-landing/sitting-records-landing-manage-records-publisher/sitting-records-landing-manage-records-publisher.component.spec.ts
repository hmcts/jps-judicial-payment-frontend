import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SittingRecordsLandingManageRecordsPublisherComponent } from './sitting-records-landing-manage-records-publisher.component';
import { PublisherWorkflowService } from '../../../_workflows/publisher-workflow.service';
import { mock } from 'webdriverio/build/commands/browser';

describe('SittingRecordsLandingManageRecordsPublisherComponent', () => {
  let component: SittingRecordsLandingManageRecordsPublisherComponent;
  let fixture: ComponentFixture<SittingRecordsLandingManageRecordsPublisherComponent>;
  let publisherWorkflowService: PublisherWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ SittingRecordsLandingManageRecordsPublisherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingManageRecordsPublisherComponent);
    component = fixture.componentInstance;
    publisherWorkflowService = TestBed.inject(PublisherWorkflowService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return formData onInit', () => {
    const mockFormData: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
    });

    spyOn(publisherWorkflowService, 'getFormData').and.returnValue(mockFormData);
    component.ngOnInit();
    expect(publisherWorkflowService.getFormData()).toEqual(mockFormData);

  })
});
