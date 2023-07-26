import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TribunalServiceComponent } from './tribunal-service.component';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';

describe('TribunalServiceComponent', () => {
  let component: TribunalServiceComponent;
  let fixture: ComponentFixture<TribunalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ TribunalServiceComponent ],
      providers: [ FormGroupDirective ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TribunalServiceComponent);
    component = fixture.componentInstance;
    component.manageRecordsFormGroup.form = new FormBuilder().group({
      tribunalService: ['Tribunal 1'],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
