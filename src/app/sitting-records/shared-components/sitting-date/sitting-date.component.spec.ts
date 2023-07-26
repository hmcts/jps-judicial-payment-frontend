import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SittingDateComponent } from './sitting-date.component';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

describe('SittingDateComponent', () => {
  let component: SittingDateComponent;
  let fixture: ComponentFixture<SittingDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ SittingDateComponent ],
      providers: [ FormGroupDirective ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingDateComponent);
    component = fixture.componentInstance;

    component.parentFormGroup.form = new FormBuilder().group({
      dateSelected: new FormBuilder().group({
        dateDay: [''],
        dateMonth: [''],
        dateYear: [''],
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
