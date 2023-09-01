import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PublisherWorkflowService } from '../../../_workflows/publisher-workflow.service';
import { SittingRecordsLandingManageRecordsPublisherComponent } from './sitting-records-landing-manage-records-publisher.component';
import { TribunalServiceComponent } from '../../shared-components/tribunal-service/tribunal-service.component';
import { SittingDateComponent } from '../../shared-components/sitting-date/sitting-date.component'

describe('SittingRecordsLandingManageRecordsPublisherComponent', () => {
  let component: SittingRecordsLandingManageRecordsPublisherComponent;
  let fixture: ComponentFixture<SittingRecordsLandingManageRecordsPublisherComponent>;
  let publisherWorkflowService: PublisherWorkflowService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SittingRecordsLandingManageRecordsPublisherComponent, TribunalServiceComponent, SittingDateComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder, PublisherWorkflowService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SittingRecordsLandingManageRecordsPublisherComponent);
    component = fixture.componentInstance;
    publisherWorkflowService = TestBed.inject(PublisherWorkflowService);
    formBuilder = TestBed.inject(FormBuilder)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.publisherForm.get('tribunalService')?.value).toBeNull();
    expect(component.publisherForm.get('dateSelected.dateDay')?.value).toBeNull();
    expect(component.publisherForm.get('dateSelected.dateMonth')?.value).toBeNull();
    expect(component.publisherForm.get('dateSelected.dateYear')?.value).toBeNull();
  });

  it('should update form with saved data if available', () => {
    const fakeData = formBuilder.group({
      tribunalService: ['Service1'],
      dateSelected: formBuilder.group({
        dateDay: ['01'],
        dateMonth: ['01'],
        dateYear: ['2023'],
      }),
    });

    spyOn(publisherWorkflowService, 'getFormData').and.returnValue(fakeData);
    component.ngOnInit();
    expect(component.publisherForm.get('tribunalService')?.value).toBe('Service1');
    expect(component.publisherForm.get('dateSelected.dateDay')?.value).toBe('01');
    expect(component.publisherForm.get('dateSelected.dateMonth')?.value).toBe('01');
    expect(component.publisherForm.get('dateSelected.dateYear')?.value).toBe('2023');
  });

  it('should emit form validity status on status change', () => {
    const emitSpy = spyOn(component.publisherFormValid, 'emit');

    component.publisherForm.get('tribunalService')?.setValue('Service1');
    component.publisherForm.get('dateSelected.dateDay')?.setValue('01');
    component.publisherForm.get('dateSelected.dateMonth')?.setValue('01');
    component.publisherForm.get('dateSelected.dateYear')?.setValue('2023');

    expect(emitSpy).toHaveBeenCalledWith([true, 'publisher']);
  });

});
