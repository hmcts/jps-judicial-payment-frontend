import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteSittingRecordsComponent } from './delete-sitting-records.component';
import { DateService } from '../../_services/date-service';
import { tableService } from '../../_services/table-services';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DeleteSittingRecordHttp } from '../../_services/delete-sitting-records-http-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('DeleteSittingRecordsComponent', () => {
  let component: DeleteSittingRecordsComponent;
  let fixture: ComponentFixture<DeleteSittingRecordsComponent>;
  let router: Router;
  let deleteRecordHttp: DeleteSittingRecordHttp;
  let srWorkFlow: SittingRecordWorkflowService;

  const mockFormData: FormGroup = new FormBuilder().group({
    dateSelected: new FormBuilder().group({
      dateDay: ['01'],
      dateMonth: ['01'],
      dateYear: ['2022'],
    }),
    tribunalService: ['Mock Tribunal Service'],
    venue: ['Mock Venue'],
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [DeleteSittingRecordsComponent],
      providers: [
        DateService,
        tableService,
        SittingRecordWorkflowService,
        DeleteSittingRecordHttp
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSittingRecordsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    deleteRecordHttp = TestBed.inject(DeleteSittingRecordHttp);
    srWorkFlow = TestBed.inject(SittingRecordWorkflowService);
    srWorkFlow.setManageVisited();
    
    srWorkFlow.setFormData(mockFormData)
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties on ngOnInit', () => {

    const formattedDate = '01/01/2022';
    srWorkFlow.setFormData(mockFormData)
    fixture.detectChanges()
    expect(component.tribService).toBe(mockFormData.controls['tribunalService'].value);
    expect(component.venue).toBe(mockFormData.controls['venue'].value);
    expect(component.date).toBe(formattedDate);

  });

  it('should navigate to "sittingRecords/deleteSuccess" on confirmDelete', () => {
    spyOn(deleteRecordHttp, 'deleteRecord').and.returnValue(of(null));
    spyOn(router, 'navigate');
    component.ngOnInit()
    component.confirmDelete();

    expect(component.apiError).toBeFalsy();
    expect(deleteRecordHttp.deleteRecord).toHaveBeenCalledWith(component.recordToDelete.recordID);
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'deleteSuccess']);
  });

  it('should set apiError to true on confirmDelete when an error occurs', () => {
    spyOn(deleteRecordHttp, 'deleteRecord').and.returnValue(throwError('API error'));
    component.ngOnInit()

    component.confirmDelete();

    expect(component.apiError).toBeTruthy();
    expect(deleteRecordHttp.deleteRecord).toHaveBeenCalledWith(component.recordToDelete.recordID);
  });

  it('should reset sittingRecordToDelete and navigate to "sittingRecords/manage" on goBack', () => {
    spyOn(srWorkFlow, 'resetSittingRecordToDelete');
    spyOn(router, 'navigate');

    component.goBack();

    expect(srWorkFlow.resetSittingRecordToDelete).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
  });
});
