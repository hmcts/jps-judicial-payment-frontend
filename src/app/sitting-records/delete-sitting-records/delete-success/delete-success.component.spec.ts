import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteSuccessComponent } from './delete-success.component';
import { Router } from '@angular/router';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { HttpClientModule } from '@angular/common/http';

describe('DeleteSuccessComponent', () => {
  let component: DeleteSuccessComponent;
  let fixture: ComponentFixture<DeleteSuccessComponent>;
  let router: Router;
  let srWorkFlow: SittingRecordWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [DeleteSuccessComponent],
      providers: [SittingRecordWorkflowService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSuccessComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    srWorkFlow = TestBed.inject(SittingRecordWorkflowService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTableData on navigateToView and navigate to "sittingRecords/view"', () => {
    spyOn(srWorkFlow, 'getTableData');
    spyOn(router, 'navigate');

    component.navigateToView();

    expect(srWorkFlow.getTableData).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });
});
