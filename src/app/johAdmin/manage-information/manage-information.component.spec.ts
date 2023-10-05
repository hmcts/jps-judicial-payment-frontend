import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ManageInformationComponent } from './manage-information.component';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { FormBuilder } from '@angular/forms';
import { UserModel } from '../../_models/user.model';
import { Router } from '@angular/router';

describe('ManageInformationComponent', () => {
  let component: ManageInformationComponent;
  let fixture: ComponentFixture<ManageInformationComponent>;
  let adminWorkflowService: AdminWorkflowService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInformationComponent ],
      imports: [ HttpClientModule ],
      providers: [ AdminWorkflowService ]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(ManageInformationComponent);
    component = fixture.componentInstance;
    adminWorkflowService = TestBed.inject(AdminWorkflowService);
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
    adminWorkflowService.setFormData(johFormData)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedJOH and selectedTribService with the value from adminWorkflowService', () => {
    component.ngOnInit();
    expect(component.selectedJOH).toEqual({
      title: "mr",
      knownAs: "john",
      surname: "doe",
      fullName: "john doe",
      emailId: "",
      idamId: "",
      personalCode: "" 
    });
    expect(component.selectedTribService).toEqual({hmctsServiceCode: '1234', service: 'service 1'});

  });

  it('should reset form data and navigate to home', () => {
    spyOn(adminWorkflowService, 'resetFormData');
    spyOn(router, 'navigate');

    component.cancelFlow();

    expect(adminWorkflowService.resetFormData).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
  });

  it('should navigate to "sittingRecords/johFlags" when editJohFlags() is called', () => {
    spyOn(router, 'navigate');
  
    component.editJohFlags();
  
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'joh', 'flags']);
  });

});