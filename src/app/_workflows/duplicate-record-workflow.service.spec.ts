import { TestBed } from '@angular/core/testing';
import { DuplicateRecordWorkflowService } from './duplicate-record-workflow.service';
import { DateService } from '../_services/date-service/date-service'
import { UserInfoService } from '../_services/user-info-service/user-info-service';
import { SittingRecordsService } from '../_services/sitting-records-service/sitting-records.service';
import { SittingRecordWorkflowService } from './sitting-record-workflow.service';
import { of } from 'rxjs';

describe('DuplicateRecordWorkflowService', () => {
    let service: DuplicateRecordWorkflowService;
    let dateSvcStub: Partial<DateService>;
    let uInfoSvcStub: Partial<UserInfoService>;
    let sittingRecordsSvcStub: Partial<SittingRecordsService>;
    let srWorkFlowStub: Partial<SittingRecordWorkflowService>;

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
                { provide: SittingRecordWorkflowService, useValue: srWorkFlowStub },
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
                const mockErrorRecords = ['record1', 'record2'];
                service.setErrorRecords(mockErrorRecords);
                expect(service.getErrorRecords()).toEqual(mockErrorRecords);
            });
        });

        describe('setErrorRecords', () => {
            it('should set error records', () => {
                const mockErrorRecords = ['record1', 'record2'];
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
                const mockErrorRecords = [
                    { errorCode: 'VALID' },
                    { errorCode: 'INVALID_DUPLICATE_RECORD' },
                    { errorCode: 'VALID' }
                ];
                service.setErrorRecords(mockErrorRecords);
                const result = service.getDuplicateRecordErrors();
                expect(result.validRecords).toEqual([mockErrorRecords[0], mockErrorRecords[2]]);
                expect(result.optionsSelected).toEqual([true, false, true]);
                expect(result.errorRecords).toEqual(mockErrorRecords);
            });
        });

        describe('matchDuplicateRecord', () => {
            it('should match duplicate record if personal code matches', () => {
                const formData = { value: { JOH: [ { johName: { personalCode: 'ABC123', fullName: 'John Doe' }, johRole: { appointment: 'Judge' } } ], period: 'AM' } };
                const result = service.matchDuplicateRecord('ABC123', formData);

                expect(result).toEqual({
                    johName: 'John Doe',
                    johRole: 'Judge',
                    period: 'AM'
                });
            });

            it('should return empty object if no match', () => {
                const formData = {value: {JOH: [{ johName: { personalCode: 'XYZ789' } } ] } };
                const result = service.matchDuplicateRecord('ABC123', formData);

                expect(result).toEqual({});
            });

        });

        describe('DuplicateRecordWorkflowService', () => {

            it('should match duplicate records', () => {
                const validRecords = [ { postedRecord: { personalCode: 'ABC123', sittingDate: '2022-01-01' } } ];

                const formData = { value: { JOH: [ { johName: { personalCode: 'ABC123', fullName: 'John Doe' }, johRole: { appointment: 'Judge' } } ], period: 'AM' } };

                const expected = [ { johName: 'John Doe', johRole: 'Judge', johPeriod: 'AM', postedDate: '2022-01-01' } ];

                const result = service.matchDuplicateRecords(validRecords, formData);

                expect(result).toEqual(expected);

            });

        });

        describe('postResolvedDuplicates', () => {
            it('should return "No_Records" when there are no resolved records', () => {
                const errorRecords = [];
                const optionsSelected = [];
                const result = service.postResolvedDuplicates(errorRecords, optionsSelected);
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
                const optionsSelected = [true];

                service.postResolvedDuplicates(errorRecords, optionsSelected);

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

});
