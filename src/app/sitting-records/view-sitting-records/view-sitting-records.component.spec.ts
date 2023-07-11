import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewSittingRecordsComponent } from './view-sitting-records.component';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { SittingRecordsInfoBannerComponent } from '../../sitting-records-info-banner/sitting-records-info-banner.component'
import { HttpClientModule } from '@angular/common/http';

describe('ViewSittingRecordsComponent', () => {
  let component: ViewSittingRecordsComponent;
  let fixture: ComponentFixture<ViewSittingRecordsComponent>;
  let mockDateService: { formatDateFromForm: { and: { returnValue: (arg0: string) => void; }; }; };
  let mockRouter: { navigate: unknown; };

  beforeEach(() => {
    mockDateService = jasmine.createSpyObj(['formatDateFromForm']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [ ViewSittingRecordsComponent, SittingRecordsInfoBannerComponent ],
      providers: [
        { provide: DateService, useValue: mockDateService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [RouterTestingModule, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSittingRecordsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the manage page on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','manage']);
  });

  it('should navigate to the add sitting records page on addNewRecord', () => {
    component.addNewRecord();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','add']);
  });
});
