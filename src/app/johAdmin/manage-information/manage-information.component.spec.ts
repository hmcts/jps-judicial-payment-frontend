import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ManageInformationComponent } from './manage-information.component';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { FormBuilder } from '@angular/forms';
import { UserModel } from '../../_models/user.model';

describe('ManageInformationComponent', () => {
  let component: ManageInformationComponent;
  let fixture: ComponentFixture<ManageInformationComponent>;
  let adminWorkflowService: AdminWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInformationComponent ],
      imports: [ HttpClientModule ],
      providers: [ AdminWorkflowService ]
    }).compileComponents();
  });

  beforeEach(() => {
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
});