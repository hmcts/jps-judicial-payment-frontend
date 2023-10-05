import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlagsSuccessComponent } from './flags-success.component';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { Router } from '@angular/router';
import { ConvertFlagDateToString } from '../../_pipes/convertFlagDates-pipe';
import { ConvertBooleanPipe } from '../../_pipes/convertBoolean-pipe';
import { FormBuilder } from '@angular/forms';
import { UserModel } from '../../_models/user.model';

describe('FlagsSuccessComponent', () => {
  let component: FlagsSuccessComponent;
  let fixture: ComponentFixture<FlagsSuccessComponent>;
  let adminWorkflow: AdminWorkflowService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlagsSuccessComponent, ConvertFlagDateToString, ConvertBooleanPipe ],
    })
    .compileComponents();
    adminWorkflow = TestBed.inject(AdminWorkflowService)
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(FlagsSuccessComponent);
    component = fixture.componentInstance;
    const mockUserInfo: UserModel = {
      title: "mr",
      knownAs: "john",
      surname: "doe",
      fullName: "john doe",
      emailId: "",
      idamId: "",
      personalCode: "" 
    }
    const johFormData = new FormBuilder().group({
      tribunalService: [{hmctsServiceCode: '1234', service: 'service 1'}],
      johName: [mockUserInfo]
    });
    adminWorkflow.setFormData(johFormData)

    const flagForm = {
      londonFlag: true,
      crownFlag: true,
      flagDate: {
        flagDay: '1',
        flagMonth: '2',
        flagYear: '2022',
      }
    }
    adminWorkflow.setFlagValues(flagForm)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedJOH and flagOptions', () => {
    component.ngOnInit();
    expect(component.selectedJOH).toBeDefined();
    expect(component.flagOptions).toBeDefined();
  });

  it('should reset cameFromManage and navigate to sittingRecords/home', () => {
    spyOn(adminWorkflow, 'resetCameFromManage');
    spyOn(router, 'navigate');
    component.navigateToManage();
    expect(adminWorkflow.resetCameFromManage).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
  });

  it('should navigate to sittingRecords/manageJudicial', () => {
    spyOn(router, 'navigate');
    component.navigateToFlags();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'joh', 'manage']);
  });
});