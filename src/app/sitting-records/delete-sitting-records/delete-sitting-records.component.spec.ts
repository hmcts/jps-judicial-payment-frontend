import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DeleteSittingRecordsComponent } from './delete-sitting-records.component';
import { ManageSittingRecordsWorkflowService } from '../../_workflows/manage-sitting-record-workflow.service';
import { DeleteSittingRecordHttp } from '../../_services/delete-sitting-records-http-service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('DeleteSittingRecordsComponent', () => {
  let component: DeleteSittingRecordsComponent;
  let router: Router;
  let srWorkflowService: ManageSittingRecordsWorkflowService;
  let deleteService: DeleteSittingRecordHttp;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DeleteSittingRecordsComponent,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ManageSittingRecordsWorkflowService },
        { provide: DeleteSittingRecordHttp }
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    component = TestBed.inject(DeleteSittingRecordsComponent);
    router = TestBed.inject(Router);
    srWorkflowService = TestBed.inject(ManageSittingRecordsWorkflowService);
    deleteService = TestBed.inject(DeleteSittingRecordHttp);

    const record = { sittingRecordId: '123' };
    const venue: FormGroup = new FormBuilder().group({
      venue: ['Venue 1'],
    });
    srWorkflowService.setSittingRecordToDelete(record);
    spyOn(srWorkflowService, 'getFormData').and.returnValue(venue);

  });

  it('should navigate when delete succeeds', () => {

    spyOn(deleteService, 'deleteRecord').and.returnValue(of(""));
    component.ngOnInit()
    component.confirmDelete();

    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'deleteSuccess']);
  });

  it('should set error when delete fails', () => {
    const errorResponse = {
      status: 404,
      error: { message: 'Error:Delete failed' }  
    };

    spyOn(deleteService, 'deleteRecord').and.returnValue(throwError(() => errorResponse));
    component.ngOnInit();
    component.confirmDelete();

    expect(component.apiError).toBeTrue();
    expect(component.apiErrorMsg).toBe('Delete failed');
  });

  it('should reset record and navigate on goBack', () => {
    spyOn(srWorkflowService, 'resetSittingRecordToDelete');

    component.goBack();

    expect(srWorkflowService.resetSittingRecordToDelete).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

});
