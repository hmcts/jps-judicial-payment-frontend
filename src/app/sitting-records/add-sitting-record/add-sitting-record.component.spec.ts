import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddSittingRecordComponent } from './add-sitting-record.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('AddSittingRecordComponent', () => {
  let component: AddSittingRecordComponent;
  let fixture: ComponentFixture<AddSittingRecordComponent>;
  let router: Router;
  let srWorkflowService: SittingRecordWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSittingRecordComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientModule ],
      providers: [ SittingRecordWorkflowService, DateService ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSittingRecordComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    srWorkflowService = TestBed.inject(SittingRecordWorkflowService);
    srWorkflowService.setManageVisited();
    const formDataMock: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    srWorkflowService.setFormData(formDataMock)
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to sittingRecords view on goBack()', () => {
    const spy = spyOn(router, 'navigate');
    component.goBack();
    expect(spy).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

  it('should add new JOH form group on addNewJoh() if johFormArray length < 3', () => {
    const initialLength = component.johFormArray.length;
    component.addNewJoh();
    expect(component.johFormArray.length).toBeGreaterThan(initialLength);
  });

  it('should not add new JOH form group on addNewJoh() if johFormArray length = 3', () => {
    component.addNewJoh();
    component.addNewJoh();
    component.addNewJoh();
    const initialLength = component.johFormArray.length;
    component.addNewJoh();
    expect(component.johFormArray.length).toEqual(initialLength);
  });

  it('should remove JOH form group on removeJoh()', () => {
    const initialLength = component.johFormArray.length;
    component.removeJoh(0);
    expect(component.johFormArray.length).toBeLessThan(initialLength);
  });

  it('should navigate to sittingRecords addSuccess on submitNewSittingRecord()', () => {
    const spy = spyOn(router, 'navigate');
    component.submitNewSittingRecord();
    expect(spy).toHaveBeenCalledWith(['sittingRecords', 'addSuccess']);
  });
});

