import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/publisher-flow/publish-records/publish-records.component.spec.ts
import { PublishRecordsComponent } from './publish-records.component';

describe('PublishRecordsComponent', () => {
  let component: PublishRecordsComponent;
  let fixture: ComponentFixture<PublishRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishRecordsComponent);
========
import { ErrorSummaryComponent } from './error-summary.component';

describe('ErrorSummaryComponent', () => {
  let component: ErrorSummaryComponent;
  let fixture: ComponentFixture<ErrorSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorSummaryComponent);
>>>>>>>> master:src/app/error-summary/error-summary.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
