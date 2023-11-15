import { TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CompareRecordsWorkflowService } from './compare-record-workflow.service';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service';
import { DateService } from '../_services/date-service/date-service';
import { of } from 'rxjs';

describe('CompareRecordsWorkflowService', () => {
    let service: CompareRecordsWorkflowService;
    const mockViewSittingRecordService = jasmine.createSpyObj(['postObject']);
    const mockDateService = jasmine.createSpyObj(['formatDateForPost']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                CompareRecordsWorkflowService,
                { provide: ViewSittingRecordService, useValue: mockViewSittingRecordService },
                { provide: DateService, useValue: mockDateService }
            ]
        });
        service = TestBed.inject(CompareRecordsWorkflowService);
    });

    function createMockFormGroup(): FormGroup {
        return new FormGroup({
            region: new FormControl({ region_id: 1 }),
            tribunalService: new FormControl({ hmctsServiceCode: 'code' }),
            startDate: new FormGroup({
                dateDay: new FormControl("11"),
                dateMonth: new FormControl("4"),
                dateYear: new FormControl("2023")
            }),
            endDate: new FormGroup({
                dateDay: new FormControl("11"),
                dateMonth: new FormControl("4"),
                dateYear: new FormControl("2023")
            }),
        });
    }

    it('should process and send data correctly in getSittingRecordsData', () => {
        const mockForm = createMockFormGroup();
        service.setFormData(mockForm);

        mockDateService.formatDateForPost.and.returnValues('formattedStart', 'formattedEnd');
        mockViewSittingRecordService.postObject.and.returnValue(of({}));

        service.getSittingRecordsData(10);

        expect(mockDateService.formatDateForPost).toHaveBeenCalledTimes(2);
        expect(mockViewSittingRecordService.postObject).toHaveBeenCalledWith(jasmine.any(Object), 'code');
    });

    it('should set the form data correctly', () => {
        const mockForm = createMockFormGroup();
        service.setFormData(mockForm);
        expect(service.getFormData()).toEqual(mockForm);
    });

    it('should set landingVisited to true', () => {
        service.setLandingVisited();
        expect(service.getLandingVisited()).toBeTrue();
    });
    
    it('should reset landingVisited to false', () => {
        service.resetLandingVisited();
        expect(service.getLandingVisited()).toBeFalse();
    });

    it('should set the user landing data correctly', () => {
        const mockFormData = new FormGroup({ 
            options: new FormControl("compareSittingRecords" )
        });
        service.setUserLandingData(mockFormData);
        expect(service.userLandingData).toEqual(mockFormData);
    });

});
