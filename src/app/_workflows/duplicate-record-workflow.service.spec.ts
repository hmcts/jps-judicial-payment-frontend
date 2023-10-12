import { TestBed } from '@angular/core/testing';
import { DuplicateRecordWorkflowService } from './duplicate-record-workflow.service';
import { DateService } from '../_services/date-service/date-service'
import { UserInfoService } from '../_services/user-info-service/user-info-service';
import { SittingRecordsService } from '../_services/sitting-records-service/sitting-records.service';
import { RecorderWorkflowService } from './recorder-workflow.service';
import { of } from 'rxjs';
import { DuplicateResponse, SittingRecordsPostObj } from '../_models/addSittingRecords.model';

describe('DuplicateRecordWorkflowService', () => {
    let service: DuplicateRecordWorkflowService;
    let dateSvcStub: Partial<DateService>;
    let uInfoSvcStub: Partial<UserInfoService>;
    let sittingRecordsSvcStub: Partial<SittingRecordsService>;
    let srWorkFlowStub: Partial<RecorderWorkflowService>;

    beforeEach(() => {
        dateSvcStub = {};
        uInfoSvcStub = {
            getIdamId: () => 'testId',
            getUserName: () => 'testUser'
        };
        sittingRecordsSvcStub = {
            postNewSittingRecord: jasmine.createSpy('postNewSittingRecord').and.returnValue(of('mockReturnValue')),
        };
        srWorkFlowStub = {
            getHmctsServiceCode: () => 'testServiceCode'
        };

        TestBed.configureTestingModule({
            providers: [
                DuplicateRecordWorkflowService,
                { provide: DateService, useValue: dateSvcStub },
                { provide: UserInfoService, useValue: uInfoSvcStub },
                { provide: SittingRecordsService, useValue: sittingRecordsSvcStub },
                { provide: RecorderWorkflowService, useValue: srWorkFlowStub },
            ]
        });
        service = TestBed.inject(DuplicateRecordWorkflowService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('DuplicateRecordWorkflowService', () => {

        describe('getErrorRecords', () => {
            it('should return error records', () => {
                const mockErrorRecords = [{ errorCode: 'POTENTIAL_DUPLICATE_RECORD', message: 'Error 1' }, { errorCode: 'INVALID_DUPLICATE_RECORD', message: 'Error 2' }];
                service.setErrorRecords(mockErrorRecords);
                expect(service.getErrorRecords()).toEqual(mockErrorRecords);
            });
        });

        describe('setErrorRecords', () => {
            it('should set error records', () => {
                const mockErrorRecords = [{ errorCode: 'POTENTIAL_DUPLICATE_RECORD', message: 'Error 1' }, { errorCode: 'INVALID_DUPLICATE_RECORD', message: 'Error 2' }];
                service.setErrorRecords(mockErrorRecords);
                expect(service.getErrorRecords()).toEqual(mockErrorRecords);
            });
        });

        describe('resetErrorRecords', () => {
            it('should reset error records', () => {
                const mockErrorRecords = ['record1', 'record2'];
                service.setErrorRecords(mockErrorRecords);
                service.resetErrorRecords();
                expect(service.getErrorRecords()).toBeUndefined();
            });
        });

        describe('getDuplicateRecordErrors', () => {
            it('should return correct error records structure', () => {
                service.setErrorRecords(mockErrorRecords);
                const result = service.getDuplicateRecordErrors();
                expect(result.validRecords).toEqual([mockErrorRecords[1], mockErrorRecords[2]]);
                expect(result.optionsSelected).toEqual([false, true, true]);
                expect(result.errorRecords).toEqual(mockErrorRecords);
            });
        });

        describe('DuplicateRecordWorkflowService', () => {

            it('should match valid records', () => {
                const validRecords = [ { postedRecord: { personalCode: 'ABC123', sittingDate: '2022-01-01' } } ];

                const formData = { value: { JOH: [ { johName: { personalCode: 'ABC123', fullName: 'John Doe' }, johRole: { appointment: 'Judge' } } ], period: 'AM' } };

                const expected = [ { johName: 'John Doe', johRole: 'Judge', johPeriod: 'AM', postedDate: '2022-01-01' } ];

                const result = service.matchValidRecords(validRecords, formData);

                expect(result).toEqual(expected);

            });

        });

        describe('postResolvedDuplicates', () => {
            it('should return "No_Records" when there are no resolved records', () => {
                const errorRecords = [];
                const result = service.postResolvedDuplicates(errorRecords);
                result.subscribe(res => {
                    expect(res).toEqual('No_Records');
                });
            });

            it('should call postNewSittingRecord method of sittingRecordsSvc when there are resolved records', () => {
                const errorRecords = [{
                    errorCode: 'INVALID_DUPLICATE_RECORD',
                    postedRecord: {
                        personalCode: '1234',
                        sittingDate: '2023-08-04',
                        replaceDuplicate: false
                    }
                }];

                service.postResolvedDuplicates(errorRecords);

                const expectedPostBody = {
                    recordedByIdamId: 'testId',
                    recordedByName: 'testUser',
                    recordedSittingRecords: [{
                        personalCode: '1234',
                        sittingDate: '2023-08-04',
                        replaceDuplicate: true,
                        hmctsServiceCode: 'testServiceCode'
                    }]
                };
                expect((sittingRecordsSvcStub.postNewSittingRecord as jasmine.Spy).calls.count()).toEqual(1);
                expect((sittingRecordsSvcStub.postNewSittingRecord as jasmine.Spy).calls.argsFor(0)[0]).toEqual(expectedPostBody);
                expect((sittingRecordsSvcStub.postNewSittingRecord as jasmine.Spy).calls.argsFor(0)[1]).toEqual('testServiceCode');
            });
        });
        
    })

    describe('checkForRecordsToSubmit', () => {
        it('should return true if there are is true in user selection options', () => {
            const errorRecords = [
                true, false, false
            ];
            const result = service.checkForRecordsToSubmit(errorRecords);
            result.subscribe(res => {
                expect(res).toBeTrue();
            });
        });

        it('should return false if there is no true in user selection options', () => {
            const errorRecords = [
                false, false, false
            ];
            const result = service.checkForRecordsToSubmit(errorRecords);
            result.subscribe(res => {
                expect(res).toBeFalse();
            });
        });
    });

    describe('getDuplicateRecordText', () => {
        it('should return an array of strings with the correct error messages', () => {
            const errorRecords = [
                { errorCode: 'POTENTIAL_DUPLICATE_RECORD' },
                { errorCode: 'INVALID_DUPLICATE_RECORD' },
                { errorCode: 'POTENTIAL_DUPLICATE_RECORD' }
            ];
            const result = service.getDuplicateRecordText(errorRecords);
            expect(result).toEqual(['Potential duplicate found', 'Record already exists']);
        });

        it('should not include duplicate error messages', () => {
            const errorRecords = [
                { errorCode: 'POTENTIAL_DUPLICATE_RECORD' },
                { errorCode: 'POTENTIAL_DUPLICATE_RECORD' },
                { errorCode: 'INVALID_DUPLICATE_RECORD' }
            ];
            const result = service.getDuplicateRecordText(errorRecords);
            expect(result).toEqual(['Potential duplicate found', 'Record already exists']);
        });
    });

    describe('sortedRecords', () => {
        it('should return an array of error records with specific error codes', () => {
            const errorRecords = [
                { errorCode: 'POTENTIAL_DUPLICATE_RECORD', message: 'Error 1' },
                { errorCode: 'INVALID_DUPLICATE_RECORD', message: 'Error 2' },
                { errorCode: 'POTENTIAL_DUPLICATE_RECORD', message: 'Error 3' },
                { errorCode: 'INVALID_DUPLICATE_RECORD', message: 'Error 4' },
            ];

            const expectedOutput = [
                { errorCode: 'POTENTIAL_DUPLICATE_RECORD', message: 'Error 1' },
                { errorCode: 'POTENTIAL_DUPLICATE_RECORD', message: 'Error 3' },
                { errorCode: 'INVALID_DUPLICATE_RECORD', message: 'Error 2' },
                { errorCode: 'INVALID_DUPLICATE_RECORD', message: 'Error 4' },
            ];

            const result = service.sortedRecords(errorRecords);

            expect(result).toEqual(expectedOutput);
        });
    });
});

const postedRoecordMock: SittingRecordsPostObj = {
    hmctsServiceCode: '',
    sittingDate: new Date(),
    epimmsId: '',
    personalCode: '',
    contractTypeId: '',
    judgeRoleTypeId: '',
    durationBoolean: '',
    replaceDuplicate: false
}

const mockErrorRecords: DuplicateResponse[] = [
    {
        errorCode: 'INVALID_DUPLICATE_RECORD',
        postedRecord: postedRoecordMock,
        createdByName: '123',
        AM: true,
        PM: false,
        judgeRoleTypeId: '2',
        judgeRoleTypeName: 'Medical Member',
        createdDateTime: '',
        statusId: ''
    },
    {
        errorCode: 'VALID',
        postedRecord: postedRoecordMock,
        createdByName: '456',
        AM: true,
        PM: false,
        judgeRoleTypeId: '3',
        judgeRoleTypeName: 'Judge',
        createdDateTime: '',
        statusId: ''
    },
    {
        errorCode: 'VALID',
        postedRecord: postedRoecordMock,
        createdByName: '789',
        AM: true,
        PM: false,
        judgeRoleTypeId: '1',
        judgeRoleTypeName: 'Recorder',
        createdDateTime: '',
        statusId: ''
    }
];