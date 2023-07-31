import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddSittingRecordsConfirmComponent } from './add-sitting-records-confirm.component';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DateService } from '../../../_services/date-service/date-service';
import { of } from 'rxjs';

describe('AddSittingRecordsConfirmComponent', () => {
  let component: AddSittingRecordsConfirmComponent;
  let fixture: ComponentFixture<AddSittingRecordsConfirmComponent>;
  let srWorkFlow: SittingRecordWorkflowService;
  let router: Router;
  let httpMock: HttpTestingController;
  let dateSvc: DateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AddSittingRecordsConfirmComponent],
      providers: [SittingRecordWorkflowService]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSittingRecordsConfirmComponent);
    component = fixture.componentInstance;
    srWorkFlow = TestBed.inject(SittingRecordWorkflowService);
    router = TestBed.inject(Router);
    httpMock= TestBed.inject(HttpTestingController);
    dateSvc = TestBed.inject(DateService);
    spyOn(srWorkFlow, 'getAddSittingRecords').and.returnValue(new FormGroup({ test: new FormControl('') }));
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset cameFromConfirm and addSittingRecords and navigate to "sittingRecords/manage" when cancelAdd is called', () => {
    spyOn(srWorkFlow, 'resetCameFromConfirm');
    spyOn(srWorkFlow, 'resetAddSittingRecords');
    spyOn(router, 'navigate');

    component.cancelAdd();

    expect(srWorkFlow.resetCameFromConfirm).toHaveBeenCalled();
    expect(srWorkFlow.resetAddSittingRecords).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
  });

  it('should set cameFromConfirm and navigate to "sittingRecords/add" when goBack is called', () => {
    spyOn(srWorkFlow, 'setCameFromConfirm');
    spyOn(router, 'navigate');

    component.goBack();

    expect(srWorkFlow.setCameFromConfirm).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'add']);
  });

  it('should call formAndPostNewSittingRecord and navigate to "sittingRecords/addSuccess" when submitNewRecords is called', () => {
    spyOn(srWorkFlow, 'formAndPostNewSittingRecord').and.returnValue(of({}));
    spyOn(router, 'navigate');

    component.submitNewRecords();

    expect(srWorkFlow.formAndPostNewSittingRecord).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'addSuccess']);
  });

  it('should convert the period correctly', () => {
    spyOn(dateSvc, 'convertPeriod').and.returnValue('Morning');
    expect(component.convertPeriod('am')).toBe('Morning');
    expect(dateSvc.convertPeriod).toHaveBeenCalled();
  });
});
