import { DeleteSuccessComponent } from './delete-success.component';
import { Router } from '@angular/router';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';

describe('DeleteSuccessComponent', () => {
  let component: DeleteSuccessComponent;
  let router: Router;
  let srWorkflow: SittingRecordWorkflowService;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    srWorkflow = jasmine.createSpyObj('SittingRecordWorkflowService', ['getSittingRecordsData']);
    component = new DeleteSuccessComponent(srWorkflow, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to sittingRecords/view when navigateToView is called', () => {
    component.navigateToView();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

});
